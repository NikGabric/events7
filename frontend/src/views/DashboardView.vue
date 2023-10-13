<script setup lang="ts">
import { useEventStore } from '../stores/event';
import { storeToRefs } from 'pinia';
import EventsTable from '../components/EventsTable.vue';
import { type ComputedRef, type Ref, computed, ref } from 'vue';
import { type Event, EventType } from '../common/event';

const { events, loading } = storeToRefs(useEventStore());
const { fetchEvents } = useEventStore();
fetchEvents();

const searchTerm: Ref<string> = ref('');
const typeFilter: Ref<EventType | string> = ref('all');
const filteredEvents: ComputedRef<Event[]> = computed(() =>
  events.value.filter((event) => {
    const nameFilter = event.name.toLowerCase().includes(searchTerm.value.toLowerCase());
    const tFilter = typeFilter.value === 'all' || event.type === typeFilter.value;
    return nameFilter && tFilter;
  })
);
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-xl text-primary font-semibold mb-4">View all events:</h1>
    <div class="flex justify-between items-end w-full mt-2 mb-6">
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Search by name:</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          v-model="searchTerm"
          class="input input-bordered input-sm"
        />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Filter by type:</span></label>
        <select class="select select-sm select-bordered" v-model="typeFilter">
          <option disabled selected>Filter by type</option>
          <option value="all">All</option>
          <option v-for="t in EventType" :key="t" :value="t">
            <p class="capitalize">{{ t }}</p>
          </option>
        </select>
      </div>
    </div>
    <span v-if="loading" class="loading loading-ring loading-lg"></span>
    <events-table v-else :events="filteredEvents" />
  </div>
</template>

<style scoped></style>
