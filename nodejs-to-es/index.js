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

        console.log(response.hits.total)
        for (hit of response.hits.hits) {

            href ='https://www.ptt.cc/bbs/' + hit._source.board + '/' + hit._source.article_id + '.html'

            var article = hit._source.article_title
            if(hit.highlight){
                article = hit.highlight.article_title[0]
            }

            console.log(
                hit._source.message_count,
                hit._source[sort_by],
                hit._source.board,
                article,
                hit._source.author,
                hit._source.date_parsed,
                href
            );
        }
  } catch (err) {
    console.error(err)
  }
}


user_input = '蔡英文'

sort_by = 'message_count' // date_parsed, message_controversial, message_all, message_count
sort_type = 'desc' // desc, asc

date_filter = '' // 7d, 30d, 365d
board_filter = '' // Gossiping, Womentalk


q = {
    index: 'ptt-2018-06',
    type: 'article',
    size: 30,
    // sort: ['date_parsed:desc', '_score'],

    body: {
        query: {
            bool: {
                must: {
                    multi_match: {
                        query: user_input,
                        fields: ["article_title^3", "content"],
                        cutoff_frequency: 0.0005,
                        tie_breaker: 0.3
                    }
                },
                filter: [
                    {range:{
                        date_parsed: {
                            // gte: "now-7d/d",
                            lt: "now/d"
                        }}
                    },
                ]
            }
            // match_all: {}
            // match : { article_title: keyword }
        },
        highlight: {
            pre_tags: ["<span class=highlight>"],
            post_tags: ["</span>"],
            fragment_size: 100,
            no_match_size: 0,
            fields: {
                article_title: {}
            }
        }
    }
}


if(sort_by != "") {
    s = sort_by + ':' + sort_type
    q.sort = [s, '_score']
}

if(date_filter=='1d'){
    q.body.query.bool.filter[0].range.date_parsed.gte = "now-1d/d"
} else if(date_filter=='7d'){
    q.body.query.bool.filter[0].range.date_parsed.gte = "now-7d/d"
} else if(date_filter=='30d'){
    q.body.query.bool.filter[0].range.date_parsed.gte = "now-30d/d"
} else if(date_filter=='365d'){
    q.body.query.bool.filter[0].range.date_parsed.gte = "now-365d/d"
}

if(board_filter != ""){
    q.body.query.bool.filter.push({term: {"board": board_filter}})
}


console.log(q, q.body.query.bool, q.body.query.filter)

response = makeQuery(q)

