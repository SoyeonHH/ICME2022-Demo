import os
import subprocess
import sys
import re
import ast

path = '/mnt/soyeon/workspace/multimodal/BERT_multimodal_transformer/'
to_path = '/mnt/soyeon/workspace/multimodal/predection_results/'
sys.stdout = open(to_path + 'mosei.txt', 'w')
os.chdir(path)

result = []
result.append(
    ['Video_id', 'Segment_id', 'Label', 'Label_binary', 'Label_7']
)

video_ids = set()
with open('MAG-BERT_mosei.txt', 'r') as f:
    lines = f.readlines()
    for i, line in enumerate(lines[42:]):
        line = re.sub('\n', '', line)
        if i % 9 == 0:
            result_row = []
        elif i % 9 == 1:
            video_id = re.sub('\[[0-9]+\]', '', line)
            clip_id = re.search('\[[0-9]+\]', line)
            clip_id = clip_id.group()[1:-1]
            result_row.append(video_id)
            result_row.append(clip_id)
        elif i % 9 == 3:
            result_row.append(round(float(line), 2))
        elif i % 9 == 4:
            result_row.append(line)
        elif i % 9 == 5:
            result_row.append(line)
            result.append(result_row)
        
    for i in range(len(result)):
        for j in range(len(result[i])):
            if j == 4:
                print(result[i][j], end='\n')
            else:
                print(result[i][j], end=',')

sys.stdout.close()