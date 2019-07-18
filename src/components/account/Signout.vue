<template>
</template>
<script>
import { EventBus } from "../../event-bus.js";
import store from '../../store.js';
export default {
  methods: {
    signOut() {
      EventBus.$emit("event");
      store.commit('exit')
      delete localStorage.isAuthorized;
      delete localStorage.isAdmin;
      delete localStorage.token;
      delete localStorage.id;
      this.$router.push("/signin");
    }
  },
  mounted() {
    this.signOut();
  }
};
</script>
