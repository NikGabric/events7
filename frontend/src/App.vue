<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useEventStore } from './stores/event';
import { useToastStore } from './stores/toast';
import { storeToRefs } from 'pinia';

const { fetchEvents } = useEventStore();
fetchEvents();

const { visible, message, type } = storeToRefs(useToastStore());
</script>

<template>
  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="w-full navbar bg-base-300">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div class="flex-1 px-2 mx-2">Event7</div>
        <div class="flex-none hidden lg:block">
          <ul class="menu menu-horizontal">
            <li class="mr-2"><router-link to="/">View all events</router-link></li>
            <li><router-link to="/add-event">Add an event</router-link></li>
          </ul>
        </div>
      </div>
      <router-view v-slot="{ Component }" class="px-40 pt-8">
        <transition name="scale" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>

      <div class="toast" v-if="visible">
        <div class="alert" :class="`alert-${type}`">
          <span>{{ message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
