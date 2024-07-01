<script setup lang="ts">
import { ref, onMounted } from 'vue';
import EventService from '@/services/EventService.js';
import { useRouter } from 'vue-router';
import { EventItem } from '@/types';

const router = useRouter();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const event = ref({} as EvenItem);

onMounted(() => {
  EventService.getEvent(props.id)
    .then((response) => {
      event.value = response.data;
    })
    .catch((error) => {
      if (error.response && error.response.status == 404) {
        router.push({ name: '404Resource', params: { resource: 'event' } });
      } else {
        router.push({ name: 'NetworkError' });
      }
    });
});
</script>

<template>
  <div v-if="event">
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }"> Details </router-link>
      |
      <router-link :to="{ name: 'EventRegister' }"> Register </router-link>
      |
      <router-link :to="{ name: 'EventEdit' }"> Edit </router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>
