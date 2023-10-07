<script setup lang="ts">
import { useRouter } from 'vue-router';
import { type Event } from '../common/event';

const props = defineProps<{
  events: Event[];
}>();
const router = useRouter();

const keys = Object.keys(props.events[0]);

const navigate = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div
    class="overflow-x-auto overflow-y-scroll outline px-4 outline-accent rounded-xl"
    style="max-height: 40rem"
  >
    <table class="table table-pin-rows">
      <thead>
        <tr>
          <th v-for="key in keys" :key="key" class="capitalize">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="hover hover:cursor-pointer"
          v-for="event in events"
          :key="event.id"
          @click="navigate(`/edit-event/${event.id}`)"
        >
          <th>{{ event.id }}</th>
          <td>{{ event.name }}</td>
          <td>{{ event.description }}</td>
          <td class="capitalize">{{ event.type }}</td>
          <td>{{ event.priority }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
