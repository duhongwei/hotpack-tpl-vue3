<template>
  <div class="about">
    <h2>about title</h2>
    <p>about async text is {{ asyncData.text }}</p>
  </div>
</template>

<script>
export default {
  name:"about",
  //服务端调用
  getAsyncData(store) {
    return store.dispatch('about')
  },
  mounted() {
    if (!this.$store.state.about) {
    
      this.$store.dispatch('about')
    }
  },
  computed: {
    asyncData() {
      return this.$store.state.about || {}
    }
  }
}
</script>

<style>

.about h2{
  font-size:24px;
  color:green;
  margin-top:20px;
}
.about p{
  margin-top:20px;
}
</style>