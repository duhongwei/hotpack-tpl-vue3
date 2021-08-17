<template>
  <div class="index">
    <h2>index title</h2>
    <p>index text is {{ data.text }}</p>
  </div>
</template>
<script>
export default {
  name: 'index',
  ssr(store) {
    return store.dispatch('index')
  },
  mounted() {},
  computed: {
    data() {
      return this.$store.state.index || {}
    }
  }
}
</script>
<style>
.index h2 {
  font-size: 24px;
  color: steelblue;
  margin-top: 20px;
}
.index p {
  margin-top: 20px;
}
</style>