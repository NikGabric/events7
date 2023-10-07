import { ref, type ComputedRef, type Ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { get } from '../common/api';
import { type Event } from '../common/event';

export const useEventStore = defineStore('event', () => {
  const loading: Ref<boolean> = ref(false);
  const events: Ref<Event[]> = ref([]);

  const getEvents: ComputedRef<Event[]> = computed(() => events.value);
  const getEventById: ComputedRef<(id: number) => Event | undefined> = computed(
    () => (id: number) => events.value.find((el) => el.id === id)
  );

  const fetchEvents = async () => {
    loading.value = true;
    events.value = await get('/event/all');
    events.value.sort((el1: Event, el2: Event) => el1.id - el2.id);
    loading.value = false;
  };

  return { events, loading, getEvents, getEventById, fetchEvents };
});
