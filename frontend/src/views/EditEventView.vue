<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useEventStore } from '../stores/event';
import { Event, EditEventDto, EventType } from '../common/event';
import { ComputedRef, Ref, computed, ref, watchEffect } from 'vue';
import { put } from '../common/api';
import { useToastStore } from '../stores/toast';

const typeKeys = [EventType.ADS, EventType.APP, EventType.CROSSPROMO, EventType.LIVEOPS];

const route = useRoute();
const eventId: number = parseInt(route.params.id as string);
const router = useRouter();

const { showToast } = useToastStore();
const { getEventById } = useEventStore();
const event: ComputedRef<Event> = computed(() => getEventById(eventId));
const eventEdited: Ref<EditEventDto> = ref({});
const submitted: Ref<boolean> = ref(false);

watchEffect(() => {
  if (event.value) {
    eventEdited.value.name = event.value.name;
    eventEdited.value.description = event.value.description;
    eventEdited.value.type = event.value.type;
    eventEdited.value.priority = event.value.priority;
  }
});

const handleDeleteEvent = () => {
  //TODO
  showToast('Test', 'success');
};

const editEvent = async () => {
  submitted.value = true;
  if (validateFields()) {
    put(`/event/${eventId}`, eventEdited.value)
      .then(() => showToast('Edit successfully.', ''))
      .finally(() => router.push('/'));
  } else return;
};

const validateFields = (): boolean => {
  if (!eventEdited.value.name || !eventEdited.value.description) {
    return false;
  }
  return true;
};
</script>

<template>
  <div>
    <span v-if="!event" class="loading loading-ring loading-lg"></span>
    <div v-else class="w-full flex flex-col justify-center items-center pt-8 gap-4">
      <h1 class="text-xl text-primary">Edit event: {{ event.name }}</h1>
      <div class="form-control w-full max-w-md">
        <label class="label">
          <span class="label-text">Name:</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          v-model="eventEdited.name"
          class="input input-bordered w-full"
          :class="{ 'border-red-500': submitted && !eventEdited.name }"
        />

        <label class="label">
          <span class="label-text">Description:</span>
        </label>
        <textarea
          class="textarea textarea-bordered h-24"
          :class="{ 'border-red-500': submitted && !eventEdited.description }"
          v-model="eventEdited.description"
          placeholder="Bio"
        ></textarea>

        <label class="label">
          <span class="label-text">Type:</span>
        </label>
        <select class="select select-bordered w-full" v-model="eventEdited.type">
          <option disabled selected>Choose event type</option>
          <option v-for="t in typeKeys" :key="t">
            <span>{{ t }}</span>
          </option>
        </select>

        <label class="label">
          <span class="label-text">Priority: {{ eventEdited.priority }}</span>
        </label>
        <input
          type="range"
          min="0"
          max="10"
          class="range range-sm"
          step="1"
          v-model="eventEdited.priority"
        />
        <div class="w-full flex justify-between text-xs px-2">
          <span v-for="i in 11" :key="i">
            <span>|</span>
          </span>
        </div>
      </div>

      <div class="flex gap-2">
        <button class="btn btn-warning" @click="handleDeleteEvent">Delete event</button>
        <button class="btn btn-neutral" @click="editEvent">Submit event</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
