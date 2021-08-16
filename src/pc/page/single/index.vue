<template>
  <div>
    <h1>Hotpack Vue3 Single Page Egxample</h1>
    <p class="menu">
    <router-link to="/single">Go to Home</router-link>
    <router-link to="/single/about">Go to About</router-link>
    </p>
    <router-view></router-view>
    <p class="link"><a href="/">multipage example</a></p>
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