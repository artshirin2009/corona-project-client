<template>
  <v-tabs dark color="primary" show-arrows>
    <v-tabs-slider color="yellow"></v-tabs-slider>
    <v-tab :href="'#user'">Профиль</v-tab>
    <v-tab :href="'#category-get'">Категории</v-tab>
    <v-tab :href="'#products-get'">Товары</v-tab>
    <v-tabs-items>
      <v-tab-item :value="'user'">
        <user></user>
      </v-tab-item>
      <v-tab-item :value="'category-get'">
        <category></category>
      </v-tab-item>
      <v-tab-item :value="'products-get'">
        <product></product>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

         
     
<script>
import User from "./User";
import Category from "../../components/category/Category";
import Product from "../../components/product/Product";
import Dialogue from "../Dialogue";
export default {
  components: {
    User,
    Category,
    Product,
    Dialogue
  }
};
</script>