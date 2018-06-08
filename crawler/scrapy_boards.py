import subprocess

with open('boards.txt', 'r') as fp:
    boards = fp.read().splitlines()

# board = 'Gossiping'
for board in boards:
    # cmd_page = ['scrapy','crawl','ptt-web','-a','pages=10000,-1','-a','board='+board]
    cmd_date = ['scrapy', 'crawl', 'ptt-web', '-a', 'dates=20180101,20180601', '-a', 'board='+board]
    p = subprocess.Popen(cmd_date, stdout=subprocess.PIPE)
    for line in p.stdout:
        print(line)
    p.wait()
