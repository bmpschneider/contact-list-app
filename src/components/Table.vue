<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      sort-by="name"
      class="elevation-1"
      mobile-breakpoint="0"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            outlined
            dense
            label="Search contacts"
            prepend-inner-icon="mdi-magnify"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="btn-new-contact" color="primary" dark v-bind="attrs" v-on="on">
                <v-icon class="icon-new-contact">mdi-account-multiple-plus </v-icon>
                <span>New contact</span>
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.phoneNumber" label="Phone Number"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.street" label="Street"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.city" label="City"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.phoneNumber2" label="phoneNumber2"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="cep" label="cep"></v-text-field>
                      <v-btn color="primary" dark class="mb-2" v-on:click="getAdress()"> Search Adress </v-btn>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.state" label="UF"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "Table",
  props: {
    tab: {
      type: String,
    },
  },
  data: () => ({
    cep: "",
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Contacts",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Phone Number", value: "phoneNumber", sortable: false },
      {
        text: "Email",
        value: "email",
        align: " d-none d-lg-table-cell align-center",
        sortable: false,
      },
      {
        text: "Street",
        value: "street",
        align: " d-none d-lg-table-cell",
        sortable: false,
      },
      {
        text: "City",
        value: "city",
        align: " d-none d-lg-table-cell",
        sortable: false,
      },
      {
        text: "CEP",
        value: "cep",
        align: " d-none d-lg-table-cell",
        sortable: false,
      },
      {
        text: "Phone Number Secundary",
        value: "phoneNumber2",
        align: " d-none d-lg-table-cell",
        sortable: false,
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: "",
      phoneNumber: "",
      street: "",
      city: "",
      phoneNumber2: "",
      cep: "",
      state: "",
    },
    defaultItem: {
      name: "",
      email: 0,
      phoneNumber: 0,
      street: 0,
      city: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Contact" : "Edit Contact";
    },
  },

  watch: {
    cep(val) {
      if (val.length == 8) {
        this.getAdress(val);
      }
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      switch (this.tab) {
        case "contacts":
          this.desserts = this.$store.state.contactList;
          break;
        case "clients":
          this.desserts = this.$store.state.contactList;
          this.desserts = this.desserts.filter((desserts) => {
            return desserts.clients == true;
          });
          break;
        case "favorites":
          this.desserts = this.$store.state.contactList;
          this.desserts = this.desserts.filter((desserts) => {
            return desserts.favorites == true;
          });
          break;
      }
    },
    async getAdress(cep) {
      console.log(this.editItem.cep, "cep");
      try {
        await this.$store.dispatch("getAdress", cep);
        this.editedItem.street = this.$store.state.adress.logradouro;
        this.editedItem.city = this.$store.state.adress.localidade;
        this.editedItem.state = this.$store.state.adress.uf;
      } catch (e) {
        console.error(e);
      }
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style scoped>
.align-center {
  text-align: center !important;
}

.container {
  background-color: white;
}

.search-content {
  display: flex;
}

.search-contact {
  flex: 1;
}

.btn-new-contact {
  margin: 0 0 0 12px;
  text-transform: none;
  letter-spacing: 0;
}

.icon-new-contact {
  margin: 0 5px 0 0;
}

@media (max-width: 480px) {
  .search-content {
    display: block;
  }

  .search-contact {
    margin-bottom: 8px !important;
  }
}
</style>
