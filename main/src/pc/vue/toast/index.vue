<template>

  <div v-if="isShow" class="v-toast">
    {{ msg }}
  </div>

</template>

<script>
export default {
  created() {},
  mounted() {},
  data() {
    return {
      msg: '',
      isShow: false
    }
  },
  methods: {
    show(msg) {
      this.msg = msg
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
      }, 2000)
    }
  }
}
</script>
<style>
.v-toast{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  font-size: 15px;
  color: #fff;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1502;
}
</style>