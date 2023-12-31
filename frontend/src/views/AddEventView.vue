<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { type EventDto, EventType } from '../common/event';
import { post } from '../common/api';
import { useToastStore } from '../stores/toast';
import { useRouter } from 'vue-router';

const typeKeys = [EventType.ADS, EventType.APP, EventType.CROSSPROMO, EventType.LIVEOPS];

const router = useRouter();
const loading: Ref<boolean> = ref(false);
const { showToast } = useToastStore();
const event: Ref<EventDto> = ref({
  name: '',
  description: '',
  type: null,
  priority: 5
});
const submitted: Ref<boolean> = ref(false);

const postEvent = async () => {
  submitted.value = true;
  loading.value = true;
  if (validateFields()) {
    post('/event', event.value)
      .then(() => {
        showToast('Success adding a new event.', 'success');
        router.push('/');
      })
      .catch((err: any) => {
        showToast(err.message, 'error');
      })
      .finally(() => (loading.value = false));
  } else {
    loading.value = false;
    return;
  }
};

const validateFields = (): boolean => {
  event.value.name = event.value.name.trim();
  event.value.description = event.value.description.trim();
  if (!event.value.name || !event.value.description || !event.value.type) {
    return false;
  }
  return true;
};

const resetValues = () => {
  event.value.name = '';
  event.value.description = '';
  event.value.type = null;
  event.value.priority = 5;
};
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center pt-8 gap-4">
    <h1 class="text-xl text-primary">Add event</h1>
    <div class="form-control w-full max-w-md">
      <label class="label">
        <span class="label-text">Name:</span>
      </label>
      <input
        type="text"
        placeholder="Type here"
        v-model="event.name"
        class="input input-bordered w-full"
        :class="{ 'border-red-500': submitted && !event.name }"
      />

      <label class="label">
        <span class="label-text">Description:</span>
      </label>
      <textarea
        class="textarea textarea-bordered h-24"
        :class="{ 'border-red-500': submitted && !event.description }"
        v-model="event.description"
        placeholder="Bio"
      ></textarea>

      <label class="label">
        <span class="label-text">Type:</span>
      </label>
      <select
        class="select select-bordered w-full"
        :class="{ 'select-error': submitted && !event.type }"
        v-model="event.type"
      >
        <option disabled selected>Choose event type</option>
        <option v-for="t in typeKeys" :key="t">
          <span>{{ t }}</span>
        </option>
      </select>

      <label class="label">
        <span class="label-text">Priority: {{ event.priority }}</span>
      </label>
      <input
        type="range"
        min="0"
        max="10"
        class="range range-sm"
        step="1"
        v-model="event.priority"
      />
      <div class="w-full flex justify-between text-xs px-2">
        <span v-for="i in 11" :key="i">
          <span>|</span>
        </span>
      </div>
    </div>

    <div class="flex gap-2">
      <button class="btn btn-warning" @click="resetValues" :disabled="loading">Reset fields</button>
      <button class="btn btn-neutral" @click="postEvent" :disabled="loading">Submit event</button>
    </div>
    <span v-if="loading" class="loading loading-ring loading-md"></span>
  </div>
</template>

<style scoped></style>
