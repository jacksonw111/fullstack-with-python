<script setup lang="ts"></script>
<template>
  <router-view v-slot="{ Component, route }">
    <transition
      appear
      enter-active-class="animate__animated animate__backInRight"
      leave-active-class="animate__animated animate__fadeOut"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>
