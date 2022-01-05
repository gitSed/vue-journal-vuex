<template>
  <button class="btn btn-primary">
    <i class="fa fa-2x" :class="icon"></i>
  </button>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        default: "fa-plus",
      },
    },
  };
</script>

<style lang="scss" scoped>
  button {
    align-items: center;
    border-radius: 100%;
    height: 65px;
    width: 65px;
    right: 20px;
    bottom: 20px;
    display: flex;
    justify-content: center;
    position: fixed;
  }
</style>
