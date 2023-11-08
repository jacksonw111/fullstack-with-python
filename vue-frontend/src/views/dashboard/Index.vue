<script setup lang="ts">
import { onMounted } from 'vue'
import dashboardService from '@/api/dashboard'

onMounted(() => {
  dashboardService.testProtect()
})
</script>
<template>
  <div>dashbaord</div>
</template>
