<template>
  <v-navigation-drawer value="true" clipped
 >
    <v-list>
      <v-list-group class="my-class" no-action sub-group v-for="item in items" :key="item.title" @click right>
        <template v-slot:activator>
          <v-list-tile-action>
            <img :src="`http://localhost:3000/${item.icon}`" alt height="20" />
          </v-list-tile-action>
          <v-list-tile>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </template>

        <v-list-tile v-for="(admin, i) in admins" :key="i" @click>
          <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
          <v-list-tile-action>
            <v-icon v-text="admin[1]"></v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    items: [],
    right: null,
    admins: [["Management", "people_outline"], ["Settings", "settings"]],
  }),
  methods: {
    getAllCategories() {
      axios.get("http://localhost:3000/category", {}).then(response => {
        return (this.items = response.data);
      });
    }
  },
  mounted() {
    this.getAllCategories();
  }
};
</script>
<style scoped>
.my-class >>> .v-list__group__header__prepend-icon{
  order:2;
  margin-right: 25px;
}
.my-class >>> .v-list__tile__action {
  margin-left: 30px;
}
</style>