<template>
  <div>
    <h1>Users Page</h1>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="users"
      :pagination.sync="pagination"
      select-all
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:headers="props">
        <tr>
          <th>
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.stop="toggleAll"
            ></v-checkbox>
          </th>
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
          <td>
            <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
          </td>
          <td class="text-xs-center">{{ props.item.id }}</td>
          <td class="text-xs-center">{{ props.item.email }}</td>
          <td class="text-xs-center">{{ props.item.password }}</td>
          <td class="text-xs-center">{{ props.item.isAdmin}}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  data() {
    return {
      pagination: {
        sortBy: "id"
      },
      selected: [],

      headers: [
        { text: "Id", align: "left", value: "id" },
        { text: "Email", value: "email" },
        { text: "Password", value: "password" },
        { text: "isAdmin", value: "isAdmin" }
      ],
      users: []
    };
  },

  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.users.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }},
    getAllUsers() {
      console.log(localStorage.isAdmin)
      if (localStorage.isAdmin==='true'){

        axios
        .get("http://localhost:3000/user", {
          headers: {
            "x-access-token": `Bearer ${localStorage.token}`
          }
        })
        .then(response => {

          return (this.users = response.data);
        });
      }
    }
  },
   
  mounted() {
    this.getAllUsers();
  }
};
</script>