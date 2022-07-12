import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
    const selectColor = ref('#FF0000')

    const saveFile = () => {

    }

    watch([selectColor], ([newSelectColor]) => {
        console.log(newSelectColor)
    })

    return {
        selectColor,
    }
})
