<template>
  <v-navigation-drawer value="true" clipped>
    <v-list>
      <v-list-group
        class="my-class"
        no-action
        sub-group
        v-for="item in categories"
        :key="item.title"
        @click
        right
      >
        <template v-slot:activator>
          <v-list-tile-action>
            <img :src="`http://localhost:3000/${item.icon}`" alt height="20" />
          </v-list-tile-action>
          <v-list-tile>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </template>

        <v-list-tile v-for="item in item.childs" :key="item.id" @click>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
          <v-list-tile-action>
            <img :src="`http://localhost:3000/${item.icon}`" alt height="20" />
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import axios from "axios";
import { constants } from "crypto";
export default {
  data: () => ({
    items: [],
    right: null,
    admins: [["Management", "people_outline"], ["Settings", "settings"]]
  }),
  computed: {
    categories: function() {
      return this.items;
    }
  },
  methods: {
    getAllCategories() {
      axios.get("http://localhost:3000/category", {})
        .then(response => {
        let mainCats = response.data.filter(item => item.parent_id === 0);
        let childCats = response.data.filter(item => item.parent_id > 0);
        mainCats.forEach(obj => (obj["childs"] = []));
         
        childCats.forEach(child => {
          console.log(child.parent_id)
          console.log(mainCats[child.parent_id-1]['childs'].push(child))
        });
       console.log(mainCats)
      return this.items = mainCats;
      });
        
    }
  },
  mounted() {
    this.getAllCategories();
  }
};
</script>
<style scoped>
.my-class >>> .v-list__group__header__prepend-icon {
  order: 2;
  margin-right: 25px;
}
.my-class >>> .v-list__tile__action {
  margin-left: 30px;
}
</style>