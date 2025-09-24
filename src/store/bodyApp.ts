import {defineStore} from 'pinia'
import { ref } from 'vue'
import { type TempText } from '@/types'
export const useBodyAppStore = defineStore('bodyApp',{
    state(){
      return {
      tempText: ref<TempText>({
        name: "xiaoqu",
        age: 18,
        jianjie: "这是一个简介",
        })

      }
    }
})
