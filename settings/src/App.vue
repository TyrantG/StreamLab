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
  </div>
</template>

<style lang="scss">
html, body {
  width: 100%;
  margin: 0;
  padding: 0;
  user-select: none;
  .setting-form {
    padding: 16px 12px;
  }
}
</style>
