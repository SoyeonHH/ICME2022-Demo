import os
import subprocess
import sys

sys.stdout = open('result.txt', 'w')

path = '/mnt/soyeon/workspace/CMU_MOSI/Segments/Text/'
to_path = '/mnt/soyeon/workspace/CMU_MOSI/Segments/'
os.chdir(path)
file_list = os.listdir(path)

os.chdir(to_path)
f = open('segments_list.txt', 'w')

for file_name in sorted(file_list):
    f.writelines(file_name[:-4])
    f.writelines('\n')
f.close()

# for f in file_list:
#     os.chdir(path)
#     full_file = open(f, 'r')
#     lines = full_file.readlines()

#     count = 0
#     for line in lines:
#         count += 1
#         if count < 10:
#             sentence = line[8:]
#         else:
#             sentence = line[9:]
#         seg_file = open(f[:-4] + '_' + str(count) + '.txt', 'w')
#         seg_file.writelines(sentence)
#         seg_file.close()

sys.stdout.close()