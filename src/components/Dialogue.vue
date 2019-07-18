<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="500">
      <!--Registration items-->
      <v-card v-if="propsData.registration">
        <v-card-title class="headline grey lighten-2" primary-title>{{propsData.info.title}}</v-card-title>
        <v-card-text>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>Email:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ propsData.user.email}}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>

      <!--Update user-->
      <v-card v-if="propsData.update">
        <v-card-title>
          <span class="headline">Редактировать аккаунт</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="user.name" label="Имя" hint="Вася"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="user.email" label="Email*" required hint="vasya@gmail.com"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="user.password"
                  label="Пароль*"
                  type="password"
                  required
                  hint="vasya@gmail.com"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Картинка"
                  @click="pickFile"
                  v-model="user.image"
                  prepend-icon="attach_file"
                ></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="image"
                  accept="image/*"
                  @change="onFilePicked"
                >
              </v-flex>
            </v-layout>
          </v-container>
          <small>*обязательные поля</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Закрыть</v-btn>
          <v-btn color="blue darken-1" flat @click="accountUpdate" >Редактировать</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </div>
</template>
<script>
import { EventBus } from "../event-bus.js"
import qs from "qs";
import axios from "axios";
export default {
  props: {
    propsData: {
      type: Object
    }
  },
  data() {
    return {
      dialog: true,
      user: {
        name: "",
        email: "",
        password: "",
        image: "",
        imageUrl: "",
        imageFile: ""
      }
    };
  },
  methods: {
    accountUpdate() {
      let fileToUpload = this.$refs.image.files[0];
      let formData = new FormData();
      formData.append("name", this.user.name);
      formData.append("email", this.user.email);
      formData.append("password", this.user.password);
      
      if(fileToUpload!=='undefined'){
        formData.append("image", fileToUpload);
      }
      

      let that = this;
      axios
        .put(`http://localhost:3000/user/${that.propsData.user.id}`, formData, {
          headers: {
            "x-access-token": `Bearer ${localStorage.token}`,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(data => {
          console.log(data)
          that.dialog = false;
          EventBus.$emit("updateUser");
        })
        .catch(e => console.log(e));
    },

    pickFile() {
      this.$refs.image.click();
    },

    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.user.image = files[0].name;
        if (this.user.image.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.user.imageUrl = fr.result;
          this.user.imageFile = files[0];
        });
      } else {
        this.user.image = "";
        this.user.imageFile = "";
        this.user.imageUrl = "";
      }
    }
  },
  mounted() {
    this.user.name = this.propsData.user.name;
    this.user.email = this.propsData.user.email;
    this.user.password = this.propsData.user.password;
  },
  watch: {
    dialog() {
      this.$emit("close");
    }
  }
};
</script>