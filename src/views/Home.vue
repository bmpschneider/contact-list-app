<template>
  <v-container>
    <template>
      <v-card>
        <v-tabs v-model="tab" background-color="primary accent-4" centered dark icons-and-text>
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#contacts" @click="updateContacts()">
            Contacts
            <v-icon>mdi-account</v-icon>
          </v-tab>

          <v-tab href="#clients" @click="updateClients()">
            Clients
            <v-icon>mdi-heart</v-icon>
          </v-tab>

          <v-tab href="#favorites" @click="updateFavorites()">
            Favorites
            <v-icon>mdi-star</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item :key="1" value="contacts">
            <v-card flat>
              <Table :tab="tab" ref="contactList" />
            </v-card>
          </v-tab-item>

          <v-tab-item :key="2" value="clients">
            <v-card flat>
              <Table :tab="tab" ref="clientList" />
            </v-card>
          </v-tab-item>

          <v-tab-item :key="3" value="favorites">
            <v-card flat>
              <v-card flat>
                <Table :tab="tab" ref="favoriteList" />
              </v-card>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import Table from "../components/Table";

export default {
  name: "Home",
  components: {
    Table,
  },
  data: () => ({
    tab: "contacts",
    countClient: 0,
    countFavorite: 0,
  }),
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        await this.$store.dispatch("getUsers");
      } catch (e) {
        console.error(e);
      }
    },
    updateContacts() {
      this.$refs.contactList.renderList("contacts");
    },
    updateClients() {
      if (this.countClient != 0) {
        this.$refs.clientList.renderList("clients");
      }
      this.countClient++;
    },
    updateFavorites() {
      if (this.countFavorite != 0) {
        this.$refs.favoriteList.renderList("favorites");
      }
      this.countFavorite++;
    },
  },
};
</script>
