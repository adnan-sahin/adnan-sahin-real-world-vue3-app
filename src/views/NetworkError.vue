<template>
  <div class="networkError">
    <h1>Opps!</h1>
    <h3>
      It looks like you are experiencing some network issues,please take a
      breath and <a href="#" @click="$router.go(-1)">click here</a> to try
      again.
    </h3>
  </div>
</template>
