<script setup lang="ts">
import { PropType } from 'vue';
import { EventItem } from '@/types';
defineProps({
  event: {
    type: Object as PropType<EventItem>,
    required: true,
  },
});
</script>

<template>
  <div>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
