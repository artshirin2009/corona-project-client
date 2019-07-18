<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>
          <span class="headline">{{storedObj.title}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="item.title" label="Название" hint="Бармен"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Картинка"
                  @click="pickFile"
                  v-model="item.image"
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
        <v-alert v-if="errorMessage!=null" :value="true" type="error">{{errorMessage}}</v-alert>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Закрыть</v-btn>
          <v-btn color="blue darken-1" flat @click="itemCreate">Создать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { EventBus } from "../../event-bus.js";
import qs from "qs";
import axios from "axios";
import store from '../../store.js';
export default {
  data() {
    return {
      dialog: true,
      item: {
        title: "",
        image: "",
        imageUrl: "",
        imageFile: ""
      },
      errorMessage: null
    };
  },
  computed: {
    server(){
      return store.state.server
    },
    storedObj (){
      return store.state.category
    }
  },
  methods: {
    itemCreate() {
      let fileToUpload = this.$refs.image.files[0];
      let formData = new FormData();
      formData.append("title", this.item.title);
      if (fileToUpload !== "undefined") {
        formData.append("image", fileToUpload);
      }
      let that = this;
      axios
        .post(`${this.server.host}/${this.storedObj.folder}`, formData, {
          headers: {
            "x-access-token": `Bearer ${localStorage.token}`,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(data => {
          that.dialog = false;
          console.log('there')
          EventBus.$emit("updateItem");
        })
        .catch(e => {
          that.errorMessage = "Войдите как администратор";
        });
    },

    pickFile() {
      this.$refs.image.click();
    },

    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.item.image = files[0].name;
        if (this.item.image.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.item.imageUrl = fr.result;
          this.item.imageFile = files[0];
        });
      } else {
        this.item.image = "";
        this.item.imageFile = "";
        this.item.imageUrl = "";
      }
    }
  },

  watch: {
    dialog() {
      this.$emit("close");
    }
  }
};
</script>