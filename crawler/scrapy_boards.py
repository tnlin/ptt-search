import subprocess
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('-b', '--board_index', type=str, default='0,100', dest='board_index',  help='choice start/stop index of board')
args = parser.parse_args()

board_index = args.board_index.split(',')
start, stop = int(board_index[0]), int(board_index[1])

with open('boards.txt', 'r') as fp:
    boards = fp.read().splitlines()

# board = 'Gossiping'
for board in boards[start:stop]:
    print(board)
    cmd_page = ['scrapy', 'crawl', 'ptt-web','-a', 'pages=1,-1', '-a', 'board='+board]
    # cmd_date = ['scrapy', 'crawl', 'ptt-web', '-a', 'dates=20180101,20180601', '-a', 'board='+board]
    p = subprocess.Popen(cmd_page, stdout=subprocess.PIPE)
    for line in p.stdout:
        print(line)
    p.wait()
