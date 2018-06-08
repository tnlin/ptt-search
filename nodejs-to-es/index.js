var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: '13.78.14.166:9200',
    // log: 'trace'
});

async function makeQuery(q) {
    try {
        q = {
          index: 'test-2018-06',
          sort: 'date_parsed:desc',
          type: 'doc',
          body: {
            query: {
              match: {
                article_title: '西瓜 夏天'
              }
            }
          }
        }

        const response = await client.search(q)

        console.log(response)
        for (const hit of response.hits.hits) {
            console.log(
                hit._source.message_count.count,
                hit._source.article_title,
                hit._source.author,
                hit._score,
                hit._source.date_parsed);
        }

        // console.log(response.hits.hits)
  } catch (err) {
    console.error(err)
  }
}

makeQuery('*')