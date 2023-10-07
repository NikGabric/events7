import { ref, type ComputedRef, type Ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { get } from '../common/api';
import { type Event } from '../common/event';

export const useEventStore = defineStore('event', () => {
  const events: Ref<Event[]> = ref([]);

  const getEvents: ComputedRef<Event[]> = computed(() => events.value);
  const getEventById: ComputedRef<(id: number) => Event | undefined> = computed(
    () => (id: number) => events.value.find((el) => el.id === id)
  );

  const fetchEvents = async () => {
    events.value = await get('/event/all');
  };

  return { events, getEvents, getEventById, fetchEvents };
});
