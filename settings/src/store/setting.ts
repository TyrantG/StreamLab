// @ts-nocheck
import { ref } from 'vue'
import { defineStore } from 'pinia'

const config = JSON.parse(fba.getVar('StreamLab.config'))

export const useSettingStore = defineStore('setting', () => {
    const selectColor = ref(config.selectColor)

    const saveConfig = () => {
        config.selectColor = selectColor.value
        fba.writeFile('hiker://files/rules/TyrantG/StreamLab/data/setting.json', JSON.stringify(config))
        fba.refreshPage(true)
    }

    return {
        selectColor,
        saveConfig,
    }
})
