<template>
<div id="index">

  <zt-login>
  </zt-login>
</div>
</template>

<script>
// import Vivus from 'vivus';
import login from '../components/login';
export default {
  components: {
    ztLogin: login
  },
  methods: {
  
  },
  mounted() {

  }
}

</script>

<style lang="stylus" scoped>
#index
  width 100%
  height 100%
  background rgba(44, 58, 71,1)
  .nav
    width 70px
    height 70px
    position absolute
    left 0
    top -70px
    border-radius 50%
    text-align center
    line-height 70px
    color #fff
    font-weight 700
    transition all .4s
    box-shadow 0 0 5px #808e9b,
              0 0 10px #18212a,
              0 0 15px #18212a,
              0 0 20px rgba(44, 58, 71, 1)
    &:hover
      border-radius 10%


</style>