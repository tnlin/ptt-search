from elasticsearch_dsl import connections, DocType, Date, Nested, InnerDoc, Keyword, Text, Ip, Integer
from datetime import datetime
connections.create_connection(hosts=['13.78.14.166'])

class Message(InnerDoc):
    push_tag = Keyword(ignore_above=256)
    push_userid = Keyword(ignore_above=256)
    push_content = Keyword(ignore_above=256)
    push_ipdatetime = Keyword(ignore_above=256)


class MessageCount(InnerDoc):
    all = Integer()
    count = Integer()
    controversial = Integer()
    push = Integer()
    boo = Integer()
    neutral = Integer()


class Article(DocType):
    article_id = Keyword(ignore_above=256)
    article_title = Text(
        analyzer='ik_max_word',
        search_analyzer = 'ik_max_word'
    )
    author = Keyword(ignore_above=256)
    author_parsed = Keyword(ignore_above=256)
    board = Keyword(ignore_above=256)
    content = Text(
        analyzer='ik_max_word',
        search_analyzer = 'ik_max_word'
    )
    date = Keyword(ignore_above=256)
    date_parsed = Date(default_timezone='Asia/Taipei')
    ip = Keyword(ignore_above=256)
    message_count = Nested(MessageCount)
    messages = Nested(Message)

    class Meta:
        index = 'ptt-2018-06'
        doc_type = 'article'

Article.init()