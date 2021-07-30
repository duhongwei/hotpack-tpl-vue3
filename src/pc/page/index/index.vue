<template>
  <div>
    <h1>Vue3 Server Render</h1>
    <p class="menu">
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
    </p>
    <router-view></router-view>
    <p class="link"><a href="/desc.html">vue3 project template description</a></p>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
.menu{
  margin:20px 0;
}
.menu >a{
  margin-right:20px;
}
.link{
  margin-top:30px;
}
</style>