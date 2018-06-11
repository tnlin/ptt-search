var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: '13.78.14.166:9200',
    // log: 'trace'
});

async function makeQuery(q) {
    try {
        const response = await client.search(q)
        // console.log(response)
        // console.log(response.hits)
        // console.log(response.hits.hits)

        for (const hit of response.hits.hits) {
            href ='https://www.ptt.cc/bbs/' + hit._source.board + '/' + hit._source.article_id + '.html'
            console.log(
                hit._source.message_count.count,
                hit._source.article_title,
                hit._source.author,
                hit._score,
                // hit._source.messages,
                hit._source.date_parsed,
                href,
            );
        }
  } catch (err) {
    console.error(err)
  }
}


const keyword = '西瓜夏天'

q = {
    index: 'ptt-2018-06',
    // sort: ['date_parsed:desc', '_score'],
    type: 'article',
    size: 20,
    body: {
        query: {
            bool: {
                must: {
                    multi_match: {
                        query: keyword,
                        fields: ["article_title^3", "content"],
                        tie_breaker: 0.3
                    }
                },
                filter: {
                    // term: {
                    //     board: "*"
                    // },
                    range: {
                        date_parsed: {
                            // gte: "now-7d/d",
                            lt: "now/d"
                        }
                    }
                }
            }
        }
    }
}

sort_by = "date"
date_filter = "30d"
// board_filter = "WomenTalk"

if(sort_by=='date'){
    q.sort = ['date_parsed:desc', '_score']
} else if(sort_by=='count'){
    q.sort = ['message_count.count:desc', '_score']
} else if(sort_by=='controversial'){
    q.sort = ['message_count.controversial:desc', '_score']
}

if(date_filter=='1d'){
    q.body.query.bool.filter.range.date_parsed.gte = "now-1d/d"
} else if(date_filter=='7d'){
    q.body.query.bool.filter.range.date_parsed.gte = "now-7d/d"
} else if(date_filter=='30d'){
    q.body.query.bool.filter.range.date_parsed.gte = "now-30d/d"
} else if(date_filter=='365d'){
    q.body.query.bool.filter.range.date_parsed.gte = "now-365d/d"
}

// if(board_filter != ""){
//     q.body.query.bool.filter.term = {"board": "WomenTalk"}
// }


console.log(q, q.body.query.bool)

response = makeQuery(q)

