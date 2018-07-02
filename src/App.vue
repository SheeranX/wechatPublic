<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from './components/navbar.vue';

export default {
  name: 'App',
  components:{navbar},
  methods:{}
}
</script>

<style lang='less'>
 @import './assets/style/index.less';

#app {
  text-align: center;
  color: #2c3e50;
  font-size:@font28;
}
</style>
