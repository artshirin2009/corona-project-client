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
                <v-select 
                :items="parentCategories"
                label="Родительская категория"
                v-model="item.parentCategory"
                item-value='id'
                item-text='title'
                return-object
                ></v-select>
              </v-flex>


              <v-flex xs12>
                <v-text-field v-model="item.title" label="Название" hint="Бармен"></v-text-field>
              </v-flex>
              

              <v-flex xs12>
                <v-text-field
                  label="Иконка"
                  @click="pickIconFile"
                  v-model="item.icon"
                  prepend-icon="attach_file"
                ></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="icon"
                  accept="image/*"
                  @change="onIconFilePicked"
                />
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
                />
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
import store from "../../store.js";
import { constants } from 'crypto';
export default {
  data() {
    return {
      dialog: true,
      item: {
        title: "",
        image: "",
        imageUrl: "",
        imageFile: "",

        icon: "",
        iconUrl: "",
        iconFile: "",
        parentCategory:Number
      },
      parentCategories: [],
      errorMessage: null
    };
  },
  computed: {
    server() {
      return store.state.server;
    },
    storedObj() {
      return store.state.category;
    }
  },
  mounted(){
    this.getAllCategories()
  },
  methods: {

    getAllCategories() {
      let arr=[];
      axios.get("http://localhost:3000/category", {}).then(response => {
        response.data.map(i=> arr.push({id:i.id,title:i.title}))
        arr.push({id:0,title:"Новая категория"})
        return (this.parentCategories = arr);
      });
    },

    itemCreate() {
      let fileImageToUpload = this.$refs.image.files[0];
      let fileIconToUpload = this.$refs.icon.files[0];
      let formData = new FormData();
      formData.append("title", this.item.title);
      formData.append("parentCategory", this.item.parentCategory.id);
      
      if (fileImageToUpload !== "undefined" || fileIconToUpload !== "undefined" ) {
        formData.append("image", fileImageToUpload);
        formData.append("icon", fileIconToUpload);
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
          EventBus.$emit("updateItem");
        })
        .catch(e => {
          that.errorMessage = "Войдите как администратор";
        });
    },

    pickFile() {
      this.$refs.image.click();
    },
    pickIconFile() {
      this.$refs.icon.click();
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
    },
    onIconFilePicked(e) {
      
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.item.icon = files[0].name;
        if (this.item.icon.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.item.iconUrl = fr.result;
          this.item.iconFile = files[0];
        });
      } else {
        this.item.icon = "";
        this.item.iconFile = "";
        this.item.iconUrl = "";
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