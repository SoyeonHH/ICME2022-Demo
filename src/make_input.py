import os
import subprocess
import sys
import re
import ast

path = '/mnt/soyeon/workspace/multimodal/MISA/'
to_path = '/mnt/soyeon/workspace/multimodal/predection_results/'
sys.stdout = open(to_path + 'MISA_mosi_result.txt', 'w')
os.chdir(path)

pred_result = []
pred_result.append(
    ['Index', 'Video_id', 'Segment_id', 'Text', 'Label', 'Label_binary', 'Label_7', 'Pred', 'Pred_binary', 'Pred_7']
)

video_ids = set()
with open('MISA_mosi.txt', 'r') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        line = re.sub('\n', '', line)
        if i % 9 == 0:
            pred_row = []
            index = re.sub('[^0-9]', '', line)
            pred_row.append(index)
        elif i % 9 == 1:
            video_id = re.sub('\[[0-9]+\]', '', line)
            clip_id = re.search('\[[0-9]+\]', line)
            clip_id = clip_id.group()[1:-1]
            pred_row.append(video_id)
            pred_row.append(clip_id)
        elif i % 9 == 2:
            text = ast.literal_eval(line)
            text = ' '.join(text)
            pred_row.append(text)
        elif i % 9 == 3 or i % 9 == 6:
            pred_row.append(round(float(line), 2))
        elif i % 9 == 8:
            pred_row.append(line)
            pred_result.append(pred_row)
        else:
            pred_row.append(line)
        
    for i in range(len(pred_result)):
        for j in range(len(pred_result[i])):
            if j == 9:
                print(pred_result[i][j], end='\n')
            else:
                print(pred_result[i][j], end=',')

sys.stdout.close()