<script setup>
import { useRouter } from 'vue-router';
import { defineProps, inject } from 'vue';

const props = defineProps(['event']);
const GlobalStore = inject('GlobalStore');

const router = useRouter();

const register = () => {
  GlobalStore.flashMessage =
    'You are successfully registered for ' + props.event.title;

  setTimeout(() => {
    GlobalStore.flashMessage = '';
  }, 3000);

  router.push({
    name: 'EventDetails',
  });
};
</script>

<template>
  <p>Register the event here</p>
  <button @click="register">Register Me!</button>
</template>
