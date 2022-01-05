<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <h1>Hola mundo</h1>

    <button @click="goToDayBook" class="btn btn-primary">Primary</button>
    <button @click="goToDayBook" class="btn btn-secondary">Secondary</button>
    <button @click="goToDayBook" class="btn btn-success">Success</button>
  </div>
</template>

<script lang="ts">
  export default {
    methods: {
      goToDayBook(): void {
        this.$router.push({ name: "no-entry" });
      },
    },
  };
</script>
