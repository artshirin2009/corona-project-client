<template>
  <div>
    <!--Left menu-->
    <v-navigation-drawer temporary fixed app v-model="drawer">
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">Меню</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense class="pt-0">
        <template v-if="isAdmin">
          <v-list-tile
            v-for="item in [...this.isAdminMenuItems]"
            :key="item.title"
            :to="item.path"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <template v-if="isAuthorized">
          <v-list-tile
            v-for="item in [...this.menuItems,...this.exitItems]"
            :key="item.title"
            :to="item.path"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <template v-else>
          <v-list-tile
            v-for="item in [...this.menuItems,...this.enterItems]"
            :key="item.title"
            :to="item.path"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!--Top menu-->
    <v-toolbar app dark color="primary">
      <v-toolbar-side-icon @click="toggleDrawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title v-text="'Corona Project'" data-app></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <template v-if="isAdmin">
          <v-btn
            flat
            v-for="item in [...this.isAdminMenuItems]"
            :key="item.title"
            :to="item.path"
          >
            <v-icon left dark>{{item.icon}}</v-icon>
            {{item.title}}
          </v-btn>
        </template>
        <template v-if="isAuthorized">
          <v-btn
            flat
            v-for="item in [...this.menuItems,...this.exitItems]"
            :key="item.title"
            :to="item.path"
          >
            <v-icon left dark>{{item.icon}}</v-icon>
            {{item.title}}
          </v-btn>
        </template>
        <template v-else>
          <v-btn
            flat
            v-for="item in [...this.menuItems,...this.enterItems]"
            :key="item.title"
            :to="item.path"
          >
            <v-icon left dark>{{item.icon}}</v-icon>
            {{item.title}}
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>
<script>
import { EventBus } from "../event-bus.js";
import store from "../store";
export default {
  props: [],

  data() {
    return {
      drawer: false,
      localStorage: localStorage
    };
  },
  computed: {
    isAuthorized() {
      return store.state.isAuthorized;
    },
    isAdmin() {
      return store.state.isAdmin;
    },
    isAdminMenuItems() {
      return [
        {
          icon: "add_circle_outline",
          title: "Добавить курс",
          path: "/article"
        },
        {
          icon: "person",
          title: "Пользователи",
          path: "/users"
        }
      ];
    },
    menuItems() {
      return [
        {
          icon: "library_books",
          title: "Курсы",
          values: [
            { title: "Бармен", path: "/" },
            { title: "Повар", path: "/" },
            { title: "Бариста", path: "/" }
          ],
          path: "/products"
        },
        {
          icon: "exit_to_app",
          title: "Категории",
          path: "/categories"
        }
      ];
    },
    enterItems() {
      return [
        {
          icon: "input",
          title: "Войти",
          path: "/signin"
        },
        {
          icon: "person_add",
          title: "Регистрация",
          path: "/signup"
        }
      ];
    },
    exitItems() {
      return [
        {
          icon: "exit_to_app",
          title: "Выйти",
          path: "/signout"
        },
        {
          icon: "account_circle",
          title: "Личный кабинет",
          path: "/profile"
        }
      ];
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  },
  created() {
    EventBus.$on("event", userinfo => {
      if (userinfo) {
        this.isAdmin = userinfo.isAdmin;
      }
      localStorage.isAuthorized = this.isAuthorized = !this.isAuthorized;
    });
  },
  mounted() {}
};
</script>