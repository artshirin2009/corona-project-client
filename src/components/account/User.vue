<template>
  <v-card>
    <v-container grid-list-xl fluid>
      <v-layout wrap>
          <v-toolbar dark color="primary">
            <v-toolbar-title>User info</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="amber" dark class="mb-2" @click="openDialogue"><v-icon >edit</v-icon>Редактировать профиль</v-btn>
          </v-toolbar>
        <v-flex xs12 sm6 class="text-xs-center text-sm-center text-md-center text-lg-center">
          

          <v-avatar size="240px" style="margin:10px 0">
            <img v-if="user.image" :src="`http://localhost:3000/${user.image}`" alt="image">
            <img v-else src="../../../public/target.svg" alt>
          </v-avatar>
          
        </v-flex>
        <v-flex xs12 sm6 class="text-xs-center text-sm-center text-md-center text-lg-center">
          

          
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>Name:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ user.name }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Email:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ user.email}}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Администратор:</v-list-tile-content>
              <v-list-tile-content v-if="user.isAdmin" class="align-end">Да</v-list-tile-content>
              <v-list-tile-content v-if="!user.isAdmin" class="align-end">Нет</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Название поля:</v-list-tile-content>
              <v-list-tile-content  class="align-end">Значение</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Название поля:</v-list-tile-content>
              <v-list-tile-content  class="align-end">Значение</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Название поля:</v-list-tile-content>
              <v-list-tile-content  class="align-end">Значение</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
        <dialogue v-if="dialog" v-on:close="closeDialogue" :propsData="{user, update}"></dialogue>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import axios from "axios";
import Dialogue from "../Dialogue";
import { EventBus } from "../../event-bus.js";
import store from '../../store.js'
export default {
  components: {
    Dialogue
  },
  data: () => ({
    user: {
      image: "",
      name: "",
      email: "",
      password: ""
    },
    dialog: false,
    update: true
  }),
  methods: {
    openDialogue() {
      this.dialog = true;
    },
    closeDialogue() {
      this.dialog = false;
    },
    getUser() {
      if (localStorage.id) {
        axios
          .get(`http://localhost:3000/user/${localStorage.id}`, {
            headers: {
              "x-access-token": `Bearer ${localStorage.token}`
            }
          })
          .then(response => {
            return (this.user = response.data);
          });
      }
    },
    
  },
  created: function() {
    EventBus.$on("updateUser", () => {
      this.getUser()
    });
  },
  mounted() {
    this.getUser();
   
  }
};
</script>