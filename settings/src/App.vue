<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSettingStore } from './store/setting'

const settingStore = useSettingStore()
const {
  selectColor,
} = storeToRefs(settingStore)
</script>

<template>
  <div class="setting-form">
    <el-form label-position="top">
      <el-form-item label="选中标签颜色">
        <el-color-picker v-model="selectColor" />
      </el-form-item>
    </el-form>
    <div class="setting-save-flex">
      <el-button class="setting-save" type="primary" round @click="settingStore.saveConfig">保存修改</el-button>
    </div>
  </div>
</template>

<style lang="scss">
html, body {
  width: 100%;
  margin: 0;
  padding: 0;
  user-select: none;
  .setting-form {
    padding: 16px 24px;
  }
  .setting-save-flex {
    display: flex;
    margin: 32px 0;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    .setting-save {
      width: 72%;
    }
  }
}
</style>
