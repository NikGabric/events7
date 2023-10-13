<script lang="ts" setup>
defineProps({
  value: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <div>
    <progress class="progress progress-info w-16 mr-2" :value="value" max="10"></progress
    >{{ value }}
  </div>
</template>
