<script setup>
import EventCard from '@/components/EventCard.vue';
import { ref, onMounted, computed, watchEffect } from 'vue';
import EventService from '@/services/EventService.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps(['page']);

const page = computed(() => props.page);

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2);
  return page.value < totalPages;
});

const events = ref(null);
const totalEvents = ref(0);

onMounted(() => {
  watchEffect(() => {
    events.value = null;
    EventService.getEvents(2, page.value)
      .then((response) => {
        events.value = response.data;
        console.log('response headers', response.headers);
        totalEvents.value = response.headers['x-total-count'];
      })
      .catch(() => {
        router.push({ name: 'NetworkError' });
      });
  });
});
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        class="prev"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous Page
      </router-link>
      <router-link
        class="next"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next Page &#62;
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
  a {
    flex: 1;
    text-decoration: none;
  }
  .prev {
    text-align: left;
  }
  .next {
    text-align: right;
  }
}
</style>
