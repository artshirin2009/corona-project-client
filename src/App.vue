<template>
<v-app>
  <app-header></app-header>

  <v-content>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-content>
  <app-footer></app-footer>
</v-app>

</template>
<script>
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
export default {
  data() {
    return {
      item: false
    }
  },
  components:{
    AppHeader,
    AppFooter
  },
  methods: {
    changeItem(){
      this.item=!this.item
    }
  },
  
}
</script>