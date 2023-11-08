<script setup lang="ts">
import { RouterView } from 'vue-router'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { ref } from 'vue'
dayjs.locale('en')
const locale = ref(enUS.locale)
</script>

<template>
  <a-config-provider :locale="locale === 'en' ? enUS : zhCN">
    <RouterView />
  </a-config-provider>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
</style>
