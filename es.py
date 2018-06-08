from elasticsearch_dsl import connections, DocType, Date, Nested, InnerDoc, Keyword, Text, Ip, Integer
from datetime import datetime

connections.create_connection(hosts=['13.78.14.166'])


class Message(InnerDoc):
    push_tag = Keyword(ignore_above=256)
    push_userid = Keyword(ignore_above=256)
    push_content = Text(analyzer='ik_max_word')
    push_ipdatetime = Keyword(ignore_above=256)


class MessageCount(InnerDoc):
    all = Integer()
    boo = Integer()
    count = Integer()
    neutral = Integer()
    push = Integer()


class Article(DocType):
    article_id = Keyword(ignore_above=256)
    article_title = Text(analyzer='ik_max_word')
    author = Text(
        analyzer='ik_max_word',
        fields={'raw': Keyword(ignore_above=256)}
    )
    board = Keyword(ignore_above=256)
    content = Text(analyzer='ik_max_word')
    date = Keyword(ignore_above=256)
    ip = Ip()
    message_count = Nested(MessageCount)
    messages = Nested(Message)

    class Meta:
        index = 'test2-2018-06'


Article.init()