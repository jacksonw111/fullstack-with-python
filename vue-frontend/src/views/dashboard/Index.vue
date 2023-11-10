<script setup lang="ts">
import { onMounted } from 'vue'
import dashboardService from '@/api/dashboard'

onMounted(() => {
  dashboardService.testProtect()
})
</script>
<template>
  <div>
    <router-link to="404">404</router-link>
  </div>
</template>
<style scoped>
div {
  width: 50vw;
  height: 50vh;
  background: red;
  margin: auto;
}
</style>
