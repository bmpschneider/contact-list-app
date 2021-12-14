<template>
  <v-container>
    <template>
      <v-card>
        <v-tabs v-model="tab" background-color="primary accent-4" centered dark icons-and-text>
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#contacts">
            Contacts
            <v-icon>mdi-account</v-icon>
          </v-tab>

          <v-tab href="#clients">
            Clients
            <v-icon>mdi-heart</v-icon>
          </v-tab>

          <v-tab href="#favorites">
            Favorites
            <v-icon>mdi-star</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item :key="1" value="contacts">
            <v-card flat>
              <Table :tab="tab" />
            </v-card>
          </v-tab-item>

          <v-tab-item :key="2" value="clients">
            <v-card flat>
              <Table :tab="tab" />
            </v-card>
          </v-tab-item>

          <v-tab-item :key="3" value="favorites">
            <v-card flat>
              <v-card flat>
                <Table :tab="tab" />
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
  }),
};
</script>
