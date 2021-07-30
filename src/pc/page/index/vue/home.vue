<template>
  <div class="home">
    <h2>home title</h2>
    <p>home async text is {{ asyncData.text }}</p>
  </div>
</template>
<script>
export default {
  name:"home",
  //服务端调用
  getAsyncData(store) {
    return store.dispatch('home')
  },
  mounted() {
    if (!this.$store.state.home) {
      this.$store.dispatch('home')
    }
  },
  computed: {
    asyncData() {
      return this.$store.state.home || {}
    }
  }
}
</script>
<style>
.home h2{
  font-size:24px;
  color:steelblue;
  margin-top:20px;
}
.home p{
  margin-top:20px;
}
</style>