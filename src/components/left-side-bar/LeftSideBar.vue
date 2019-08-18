<template>
  <v-navigation-drawer
  permanent
  app
  clipped> 
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Категории
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list dense class="pt-0">
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click=""
      >
        <v-list-tile-action>
          <img :src="`http://localhost:3000/${item.icon}`" alt="" height="20">
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import axios from 'axios';
export default {
  data: () => ({
    show: false,
    items: [],
    right: null
  }),
  methods: {
    getAllCategories() {
      axios.get("http://localhost:3000/category", {}).then(response => {
        console.log(response.data)
        return (this.items = response.data);
      });
    }
  },
  mounted() {
    this.getAllCategories();
  }
};
</script>

