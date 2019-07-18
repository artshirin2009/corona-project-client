 <template>
  <v-container grid-list-lg fluid>
    <v-layout row wrap>
      <v-flex v-for="(item, index) in items" :key="index.id" lg3>
        <v-card>
          <v-img :src="`http://localhost:3000/${item.image}`" height="200px">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">Text</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-title primary-title>
            <div>
              <div class="headline" :href="'/'">{{item.title}}</div>
              <span class="grey--text">1,000 miles of wonder</span>
            </div>
          </v-card-title>
          <v-slide-y-transition>
            <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
          </v-slide-y-transition>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange" :to="'/'">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
    <script>
import axios from "axios";
export default {
  
  data: () => ({
    show: true,
    items: []
  }),
  methods: {
    getAllCategories() {
      axios.get("http://localhost:3000/product", {}).then(response => {
        return (this.items = response.data);
      });
    }
  },
  mounted() {
    this.getAllCategories();
  }
};
</script>