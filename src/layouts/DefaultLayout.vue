<template>
  <div>
    <div class="flex flex-col w-full">
      <div class="flex flex-row w-full">
        <div class="w-1/4">
          <SideBar />
        </div>
        <div class="w-3/4">
          <slot />
        </div>
      </div>
  </div>
  </div>
</template>

<script setup>
  import SideBar from '../components/SideBar.vue';

</script>