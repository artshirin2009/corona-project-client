<template>
  <div class="about">
    <h1>Регистрация</h1>
    <v-container fluid fill-height>
      
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Signup form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field
                  v-model="password"
                  :rules="paswordRules"
                  label="Password"
                  type="password"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="!valid" color="primary" @click.prevent="createUser">Register</v-btn>
            </v-card-actions>
          </v-card>
          <dialogue v-if="dialog" v-on:close="closeMethod" :propsData="{user, info,registration}"></dialogue>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { EventBus } from "../../event-bus.js";
import axios from 'axios';
import Dialogue from "../Dialogue";
import store from '../../store.js';
export default {
  components: {
    Dialogue
  },
  data: () => ({
    valid: false,
    dialog: false,
    password: "",
    paswordRules: [
      v => !!v || "Password is required",
      v => v.length >= 6 || "Password must 6 characters or more"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    user:{},
    info:{
      title: "Регистрация нового пользователя"
    },
    registration:true
  }),
  methods: {
    createUser() {
      let user = {
        email: this.email,
        password: this.password
      };
      this.user = user;
      axios
        .post("http://localhost:3000/user", user)
        .then((response) => {
          localStorage.id = response.data.user.id;
          localStorage.token = response.data.token;
          localStorage.isAdmin = response.data.user.isAdmin;
          localStorage.isAuthorized = true;
          this.dialog = true;
          
          store.commit('authorize')
    
        });
    },
    closeMethod() {
      this.$router.push("/profile");
      //EventBus.$emit("event", this.user);
    }
  }
};
</script>