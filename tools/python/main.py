import optparse
import os
import subprocess
import sys
import datetime
from shutil import copyfile
import codecs

if __name__ == '__main__':
    usage = "Usage: %prog [options] arg1 arg2 ..."
    parser = optparse.OptionParser(usage, version="%prog 1.0")
    options, args = parser.parse_args()

    current_dir = os.path.dirname(os.path.abspath(__file__))
    print(current_dir)
    start_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(start_time)
    # os.path.realpath(__file__)
    wubi_tables_dir = os.path.realpath(current_dir + "/../temp/98wubi-tables")
    wubi_98_dir = os.path.realpath(current_dir + "/../temp/98wubi")
    project_dir = os.path.realpath(current_dir + "/../../")
    print(project_dir)

    '''
        filename=wubi_tables_dir + '/98五笔单字表-【多义】.txt', wubi_tables_dir + '/t.txt' 
        with open(filename, mode='r', encoding='UTF-8-sig') as f:
        s = f.read()
        # 判断是否有BOM 
        if data[:3] == codecs.BOM_UTF8:
            data = data[3:]
    '''

    '''
    
    copyfile(wubi_tables_dir + '/98五笔单字表-【多义】.txt', wubi_tables_dir + '/t1.txt')
    f = open(wubi_tables_dir + '/t.txt', 'r', encoding='utf-16')
    data = f.read()
    #print(data)
    f.close()
    
    '''

    copyfile(wubi_tables_dir + '/19万词条-多义.txt', wubi_tables_dir + '/t2.txt')
    with open(wubi_tables_dir + '/t2.txt', 'r', encoding='utf-16') as f:
        data = f.read()
        with open(project_dir + '/server/data/data.txt', 'w+') as file:
            file.write(data)

    # 转成 unicode 表

    end_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(end_time)
