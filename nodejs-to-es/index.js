var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    // host: '13.78.14.166:9200',
    host: '168.62.50.20:9200',
    // log: 'trace'
});

async function makeQuery(q) {
    try {
        const response = await client.search(q)
        // console.log(response)
        // console.log(response.hits)
        // console.log(response.hits.hits)

        for (hit of response.hits.hits) {

            href ='https://www.ptt.cc/bbs/' + hit._source.board + '/' + hit._source.article_id + '.html'

            var article = hit._source.article_title
            if(hit.highlight){
                article = hit.highlight.article_title[0]
            }

            console.log(
                hit._source.message_count_count,
                article,
                hit._source.author,
                hit._score,
                hit._source.date_parsed,
                href
            );
        }
  } catch (err) {
    console.error(err)
  }
}


keyword = '台北美食'
sort_by = ''
date_filter = '7d'
// board_filter = "WomenTalk"


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
                        cutoff_frequency: 0.001,
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
            // match : { article_title: keyword }
        },
        highlight: {
            pre_tags: ["<span class=highlight>"],
            post_tags: ["</span>"],
            fragment_size: 80,
            no_match_size: 0,
            fields: {
                article_title: {}
            }
        }
    }
}


if(sort_by=='date'){
    q.sort = ['date_parsed:desc', '_score']
} else if(sort_by=='count'){
    q.sort = ['message_count_count:desc', '_score']
} else if(sort_by=='controversial'){
    q.sort = ['message_count_controversial:desc', '_score']
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

