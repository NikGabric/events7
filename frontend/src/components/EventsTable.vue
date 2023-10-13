<script setup lang="ts">
import { useRouter } from 'vue-router';
import { type Event } from '../common/event';

defineProps({
  events: {
    type: Array as () => Event[],
    required: true
  }
});
const router = useRouter();

const keys: string[] = ['ID', 'Name', 'Description', 'Type', 'Priority'];
const navigate = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div
    class="overflow-x-auto overflow-y-scroll outline px-4 py-2 outline-accent rounded-xl w-full"
    style="height: 40rem"
  >
    <div v-if="!events">Test</div>
    <table v-else class="table table-pin-rows">
      <thead>
        <tr>
          <th v-for="key in keys" :key="key" class="capitalize">
            {{ key }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="hover hover:cursor-pointer transition-colors"
          v-if="events.length === 0"
          @click="navigate('/add-event')"
        >
          <td colspan="5">No Events added yet! Click to add an event.</td>
        </tr>
        <TransitionGroup v-else name="list">
          <tr
            class="hover hover:cursor-pointer transition-colors w-full"
            v-for="event in events"
            :key="event.id"
            @click="navigate(`/edit-event/${event.id}`)"
          >
            <th>{{ event.id }}</th>
            <td>{{ event.name }}</td>
            <td class="description-cell">
              <div class="description-content">
                {{ event.description }}
              </div>
            </td>
            <td class="capitalize">{{ event.type }}</td>
            <td>{{ event.priority }}</td>
          </tr>
        </TransitionGroup>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.description-cell {
  max-height: 44px; /* Set your desired maximum height here */
  overflow: hidden;
}

.description-content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Set the number of maximum lines to display */
  -webkit-box-orient: vertical;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
.list-leave-active {
  position: absolute;
}
</style>
