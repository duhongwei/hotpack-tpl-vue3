<template>
  <div class="home">
    <h2>home title</h2>
    <p>home async text is {{ asyncData.text }}</p>
  </div>
</template>
<script>
export default {
  name:"home",

  ssr(store) {
    return store.dispatch('home')
  },
  mounted() {
    
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