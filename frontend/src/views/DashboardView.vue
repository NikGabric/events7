<script setup lang="ts">
import { useEventStore } from '../stores/event';
import { storeToRefs } from 'pinia';
import EventsTable from '../components/EventsTable.vue';

const { events } = storeToRefs(useEventStore());
const { fetchEvents } = useEventStore();
fetchEvents();
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-xl text-primary font-semibold mb-4">View all events:</h1>
    <span v-if="events.length === 0" class="loading loading-ring loading-lg"></span>
    <events-table v-else :events="events" />
  </div>
</template>

<style scoped></style>
