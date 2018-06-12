# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class PttWebCrawlerItem(scrapy.Item):
    board = scrapy.Field()
    article_id = scrapy.Field()
    article_title = scrapy.Field()
    author = scrapy.Field()
    date = scrapy.Field()
    content = scrapy.Field()

    messages = scrapy.Field()
    # message_count = scrapy.Field()
    message_all = scrapy.Field()
    message_count = scrapy.Field()
    message_controversial = scrapy.Field()
    message_push = scrapy.Field()
    message_boo = scrapy.Field()
    message_neutral = scrapy.Field()

    author_parsed = scrapy.Field()
    img_url = scrapy.Field()
    date_parsed = scrapy.Field()
    ip = scrapy.Field()

    error = scrapy.Field()
