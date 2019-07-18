<template  v-on:event="changeItem">
  <div class="about">
    <h1>Авторизация</h1>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Signin form</v-toolbar-title>
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
              <v-btn :disabled="!valid" color="primary" @click.prevent="signInUser">Войти</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import store from "../../store.js";
export default {
  data: () => ({
    valid: false,
    dialog: false,
    isAdmin: false,
    authorized: null,
    password: "",
    paswordRules: [
      v => !!v || "Password is required",
      v => v.length >= 6 || "Password must 6 characters or more"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    signInUser() {
      let user = { email: this.email, password: this.password };
      let that = this;
      axios
        .post("http://localhost:3000/user/login", user)
        .then(response => {
          localStorage.id = response.data.user.id;
          localStorage.token = response.data.token;
          localStorage.isAdmin = response.data.user.isAdmin;
          localStorage.isAuthorized = true;
          response.data.user.isAdmin
            ? store.commit("authorizeAsAdmin")
            : store.commit("authorize");
        })
        .then(() => {
          that.$router.push("/profile");
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
  }
};
</script>