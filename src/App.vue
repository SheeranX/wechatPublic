<template>
  <div id="app">
    <navbar></navbar>
    <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
     <router-view v-if="!$route.meta.keepAlive"></router-view>
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
  box-sizing: border-box;
  padding-bottom: 1.2rem;
}
</style>
