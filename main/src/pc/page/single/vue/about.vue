<template>
  <div class="about">
    <h2>about title</h2>
    <p>about text is {{ data.text }}</p>
  </div>
</template>

<script>
export default {
  name:"about",
  
  ssr(store) {
    return store.dispatch('about')
  },
  mounted() {
  
  },
  computed: {
    data() {
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