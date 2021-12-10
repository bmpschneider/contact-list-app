<template>
  <v-container>
    <v-row class="text-center">
      <v-container class="search-content">
        <v-text-field
          hide-details
          class="search-contact"
          outlined
          label="Search contacts"
          prepend-inner-icon="mdi-magnify"
          v-model="search"
        >
        </v-text-field>

        <v-btn class="btn-new-contact" color="primary" elevation="2" x-large
          ><v-icon class="icon-new-contact">mdi-account-multiple-plus </v-icon> New contact</v-btn
        >
      </v-container>

      <v-container>
        <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="name" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> New Item </v-btn>
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
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
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
      { text: "Email", value: "email" },
      { text: "Phone Number", value: "phoneNumber" },
      { text: "Street", value: "street" },
      { text: "City", value: "city" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: 0,
      phoneNumber: 0,
      street: 0,
      city: 0,
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
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
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
      this.desserts = [
        {
          name: "Bruno Miguel",
          email: "brunopschneider@gmail.com",
          phoneNumber: "(48) 984562072",
          street: "João Pio Duarte Silva 844",
          city: "Florianópolis",
        },
        {
          name: "Stefani Marcelino",
          email: "stefanism5@hotmail.com",
          phoneNumber: "(48) 984562072",
          street: "Santos Saraiva 1302",
          city: "São José",
        },
      ];
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
