<template>
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script>
export default {
  name: "Loader"
}
</script>

<style scoped>
.spinner-border {
  position: absolute;
  top: 50%;
  left: 48%;
  color: #27ae60;
}
</style>