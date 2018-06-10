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
                hit._source.date_parsed,
                href,
            );
        }
  } catch (err) {
    console.error(err)
  }
}



q = {
    index: 'ptt-2018-06',
    // sort: 'date_parsed:desc',
    type: 'article',
    body: {
        query: {
            match: {
                article_title: '西瓜夏天'
            }
        }
    }
}

response = makeQuery(q)

