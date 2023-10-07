<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useEventStore } from '../stores/event';
import { Event } from '../common/event';
import { ComputedRef, computed } from 'vue';

const route = useRoute();
const eventId: number = parseInt(route.params.id as string);

const { getEventById } = useEventStore();
const event: ComputedRef<Event> = computed(() => getEventById(eventId));
</script>

<template>
  <div>
    <div class="text-3xl">Edit event {{ eventId }}</div>
    {{ event }}
  </div>
</template>

<style scoped></style>
