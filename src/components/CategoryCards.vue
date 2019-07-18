<template>
  <v-container grid-list-lg fluid>
    <v-layout row wrap>
      <v-flex v-for="(item, index) in categories" :key="index.id" >
        <v-card >
          <v-img :src="`http://localhost:3000/${item.image}`" height="200px"></v-img>

          <v-card-title primary-title>
            <div>
              <div class="headline" :href="'/'">{{item.title}}</div>
              <span class="grey--text">1,000 miles of wonder</span>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat>Share</v-btn>
            <v-btn flat color="purple" :to="'/'">Explore</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text
              v-show="show"
            >I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
     
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios';
export default {
  data: () => ({
    show: false,
    categories: []
  }),
  methods: {
    getAllCategories() {
      axios.get("http://localhost:3000/category", {}).then(response => {
        return (this.categories = response.data);
      });
    }
  },
  mounted() {
    this.getAllCategories();
  }
};
</script>