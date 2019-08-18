<template>
<div>
  <LeftSideBar></LeftSideBar>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</div>
  
</template>

<script>
// @ is an alias to /src
import LeftSideBar from '@/components/left-side-bar/LeftSideBar.vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    LeftSideBar
  }
}
</script>
