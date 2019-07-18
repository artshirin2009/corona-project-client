<template>
<v-card>
  <v-container grid-list-xl fluid>
   
    <v-layout wrap>
      <v-toolbar dark color="primary">
            <v-toolbar-title>{{storedObj.title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="amber" dark class="mb-2" @click="openCreateDialogue">{{storedObj.createItem}}</v-btn>
          </v-toolbar>
      <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            :pagination.sync="pagination"
            select-all
            item-key="id"
            class="elevation-1"
          >
            <template v-slot:headers="props">
              <tr>
                <th
                  v-for="header in props.headers"
                  :key="header.text"
                  :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                  @click="changeSort(header.value)"
                >
                  <v-icon small>arrow_upward</v-icon>
                  {{ header.text }}
                </th>
              </tr>
            </template>
            <template v-slot:items="props">
              <tr :active="props.selected" @click="props.selected = !props.selected">
                <td class="text-xs-center">{{ props.item.id }}</td>
                <td class="text-xs-center">{{props.item.title}}</td>
                <td class="text-xs-center" style="display:block; text-align:center">
                  <img
                    :src="`${server.host}/${props.item.image}`"
                    height="50"
                    v-if="props.item.image"
                  >
                </td>
                <td>
                  <v-icon small class="mr-2" @click="openUpdateDialogue(props.item)">edit</v-icon>
                  <v-icon small @click="deleteItem(props.item)">delete</v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>
          <update-dialogue
            v-if="updateDialogue"
            v-on:close="closeUpdateDialogue"
            :propsData="{item, updateItem}"
          ></update-dialogue>
          <create-dialogue
            v-if="createDialogue"
            v-on:close="closeCreateDialogue"
          ></create-dialogue>
        
      </v-flex>
    </v-layout>
  </v-container>
  </v-card>
</template>


<script>
import qs from "qs";
import axios from "axios";
import store from '../../store.js'
import { EventBus } from "../../event-bus.js";
import UpdateDialogue from "./UpdateDialogue.vue";
import CreateDialogue from "./CreateDialogue.vue";
export default {
  components: {
    UpdateDialogue,
    CreateDialogue
  },
  computed: {
    server(){
      return store.state.server
    },
    storedObj (){
      return store.state.category
    }
  },
  data() {
    return {
      pagination: {
        sortBy: "id",
        descending: true
      },
      selected: [],

      headers: [
        { text: "Id", align: "left", value: "id" },
        { text: "Title", value: "title" },
        { text: "Image", value: "image" }
      ],
      items: [],

      updateDialogue: false,
      createDialogue: false,

      updateItem: true,
      item: {
        id: "",
        image: "",
        title: ""
      }
    };
  },

  methods: {
    openUpdateDialogue(item) {
      this.updateDialogue = true;
      this.item = item;
    },
    closeUpdateDialogue() {
      this.updateDialogue = false;
    },
    openCreateDialogue(item) {
      this.createDialogue = true;
      this.item = item;
    },
    closeCreateDialogue() {
      this.createDialogue = false;
    },
    deleteItem(item) {
      confirm(this.storedObj.deleteItem) &&
        axios
          .delete(`${this.server.host}/${this.storedObj.folder}/${item.id}`, {
            headers: { "x-access-token": `Bearer ${localStorage.token}` }
          })
          .then(() => {
            this.getAllItems();
          });
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.items.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },

    getAllItems() {
      axios.get(`${this.server.host}/${this.storedObj.folder}`).then(response => {
        // this.lastItem = Math.max.apply(
        //   Math,
        //   response.data.map(function(item) {
        //     return item.id;
        //   })
        // );
        
        return (this.items = response.data);
      });
    }
  },

  created() {
    EventBus.$on("updateItem", () => {
      this.getAllItems();
    });
  },
  mounted() {
    this.getAllItems();
  }
};
</script>
