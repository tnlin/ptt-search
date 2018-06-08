var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: '13.78.14.166:9200',
    log: 'trace'
});

async function makeQuery(q) {
    try {
        q = {
          index: 'test-2018-06',
          type: 'doc',
          body: {
            query: {
              match: {
                article_title: '女友'
              }
            }
          }
        }
        const response = await client.search(q)
        for (const hit of response.hits.hits) {
            console.log('hit:',hit);
        }
        // console.log(response)
  } catch (err) {
    console.error(err)
  }
}

makeQuery('*')