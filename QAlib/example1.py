import pandas as pd
import random
import os
import pickle
from konlpy.tag import Okt

class TourBot:
    def __init__(self):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        self.__okt = Okt()
        with open(f'{dir_path}/Datasets/word_count_rank.pickle', 'rb') as handle:
            self.__word_rank = pickle.load(handle)
        self._region_lst = ['제주도'] + list(self.__word_rank.keys())
    def getans(self, query_data = ''):
        region_filter = []
        for i in self._region_lst:
            if i in query_data:
                query_data = query_data.replace(i, '')
                if i == '제주도':
                    i = '제주'
                region_filter.append(i)
                break
        if not region_filter:
            region_filter = self.__word_rank.keys()
        tokens=self.__okt.morphs(query_data)
        print(tokens)
        maxpool_lst = {}
        for i in region_filter:
            for j in self.__word_rank[i].keys():
                maxpool_tmp = 1
                for t in tokens:
                    try:
                        maxpool_tmp *= max(2, self.__word_rank[i][j][t] * 100)
                    except:
                        maxpool_tmp *= 2
                if maxpool_tmp > 2 ** len(tokens):
                    maxpool_lst[(i, j)] = maxpool_tmp
        ans = sorted(list(maxpool_lst.items()), key=lambda x: x[1], reversed=True)
        if ans:
            if len(ans)>5:
                ans = ans[:5]
            return [f"{i[0][0]}에 {i[0][1]} 어떤가요?" for i in ans]
        else:
            return ['죄송합니다. 적합한 관광지를 찾지 못했어요.']