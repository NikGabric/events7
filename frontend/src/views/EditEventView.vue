<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useEventStore } from '../stores/event';
import { type Event, type EditEventDto, EventType } from '../common/event';
import { type ComputedRef, type Ref, computed, ref, watchEffect } from 'vue';
import { del, put } from '../common/api';
import { useToastStore } from '../stores/toast';

const typeKeys = [EventType.ADS, EventType.APP, EventType.CROSSPROMO, EventType.LIVEOPS];

const route = useRoute();
const eventId: number = parseInt(route.params.id as string);
const router = useRouter();

const loading: Ref<boolean> = ref(false);
const { showToast } = useToastStore();
const { getEventById } = useEventStore();
const event: ComputedRef<Event | undefined> = computed(() => getEventById(eventId));
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

const handleDeleteEvent = async () => {
  loading.value = true;
  del(`/event/${eventId}`)
    .then(() => {
      showToast('Successfully deleted event.', 'success');
      router.push('/');
    })
    .catch((err: any) => showToast(err.message, 'error'))
    .finally(() => (loading.value = false));
};

const editEvent = async () => {
  submitted.value = true;
  loading.value = true;
  if (validateFields()) {
    put(`/event/${eventId}`, eventEdited.value)
      .then(() => {
        showToast('Edit successful.', 'success');
        router.push('/');
      })
      .catch((err: any) => showToast(err.message, 'error'))
      .finally(() => (loading.value = false));
  } else {
    loading.value = false;
    return;
  }
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
        <button class="btn btn-warning" onclick="my_modal_1.showModal()" :disabled="loading">
          Delete event
        </button>
        <button class="btn btn-neutral" @click="editEvent" :disabled="loading">Submit event</button>
      </div>
      <span v-if="loading" class="loading loading-ring loading-md"></span>
    </div>

    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Deleting an event</h3>
        <p class="py-4">Are you sure you want to delete the event: {{ event?.name }}?</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn mr-2">Cancel</button>
            <button class="btn btn-warning" @click="handleDeleteEvent">Delete</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped></style>
