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

          <v-alert class="alert-sucess" type="success" v-if="alertSucess" transition="fade-transition"
            >{{ msgSucess }}
          </v-alert>

          <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="btn-new-contact" color="primary" dark v-bind="attrs" v-on="on">
                <v-icon class="icon-new-contact">mdi-account-multiple-plus </v-icon>
                <span v-if="!isMobile()">New contact</span>
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text class="content-form">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="8">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                        :rules="nameRules"
                        :error-messages="errorMessagesName ? 'Name is required' : ''"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col class="checkbox-category" cols="12" sm="4" md="4">
                      <v-checkbox
                        v-model="editedItem.client"
                        class="checkbox-client"
                        label="Client"
                        color="indigo"
                        hide-details
                      ></v-checkbox>
                      <v-checkbox
                        v-model="editedItem.favorite"
                        label="Favorite"
                        color="orange"
                        hide-details
                      ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="6" md="8">
                      <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.phoneNumber" label="Phone Number"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.street" label="Street"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                      <v-text-field v-model="editedItem.number" label="Number"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="cep"
                        label="Cep"
                        counter="8"
                        maxlength="8"
                        :error-messages="errorMessagesCep ? ['Invalid CEP'] : ''"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.district" label="District"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                      <v-text-field v-model="editedItem.city" label="City"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                      <v-text-field v-model="editedItem.state" label="UF"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                      <v-btn depressed color="primary" class="btn-new-info"> New Adress </v-btn>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                      <v-btn depressed color="primary" class="btn-new-info"> New Phone </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-alert class="alert-error" type="error" v-if="alertError" transition="fade-transition"
                >Ops! Please fill in all the required fields
              </v-alert>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
      <template v-slot:item.avatar="{ item }">
        <v-avatar class="accent white--text" color="primary" size="36" v-text="item.name.slice(0, 1).toUpperCase()">{{
          item
        }}</v-avatar>
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
        text: "",
        align: "start",
        sortable: false,
        value: "avatar",
      },
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
        text: "Number",
        value: "number",
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
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      email: "",
      phoneNumber: "",
      street: "",
      district: "",
      city: "",
      number: "",
      cep: "",
      state: "",
      client: "",
      favorite: "",
    },
    defaultItem: {
      name: "",
      email: "",
      phoneNumber: "",
      street: "",
      city: "",
    },
    errorMessagesCep: false,
    errorMessagesName: false,
    nameRules: [],
    selectedClient: true,
    selectedFavorite: true,
    alertSucess: false,
    alertError: false,
    msgSucess: "Registered Successfully",
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Contact" : "Edit Contact";
    },
  },

  watch: {
    cep(val) {
      if (val.length == 8) {
        this.getAddress(val);
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
    this.renderList();
  },

  methods: {
    renderList(tab) {
      let currentTab;
      if (!tab) {
        currentTab = this.tab;
      } else {
        currentTab = tab;
      }
      switch (currentTab) {
        case "contacts":
          this.desserts = this.$store.state.contactList;
          break;
        case "clients":
          this.desserts = this.$store.state.contactList;
          this.desserts = this.desserts.filter((desserts) => {
            return desserts.client == true;
          });
          break;
        case "favorites":
          this.desserts = this.$store.state.contactList;
          this.desserts = this.desserts.filter((desserts) => {
            return desserts.favorite == true;
          });
          break;
      }
    },
    async getAddress(cep) {
      console.log(this.editItem.cep, "cep");
      try {
        await this.$store.dispatch("getAddress", cep);
        if (this.$store.state.adress) {
          this.errorMessagesCep = false;
        } else {
          this.errorMessagesCep = true;
        }
        this.editedItem.street = this.$store.state.adress.logradouro;
        this.editedItem.district = this.$store.state.adress.bairro;
        this.editedItem.city = this.$store.state.adress.localidade;
        this.editedItem.state = this.$store.state.adress.uf;
      } catch (e) {
        this.errorMessagesCep = true;
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
      this.msgSucess = "Successfully deleted";
      this.alertSucess = true;
      this.hideAlert();
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
      let isValid = !!this.editedItem.name;

      if (isValid) {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem);
          this.$store.dispatch("editedList", this.editedItem);
          this.msgSucess = "Successfully edited!";
        } else {
          this.$store.dispatch("addNewContact", this.editedItem);
          this.msgSucess = "Successfully registered";
        }
        this.alertSucess = true;
        this.cep = "";
        this.selectedCategory = "";
        this.errorMessagesName = false;
        this.initialize();
        this.hideAlert();
        this.close();
      } else {
        this.alertError = true;
        this.errorMessagesName = true;
        this.hideAlert();
      }
    },
    isMobile() {
      var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        return true;
      }
    },
    hideAlert() {
      window.setTimeout(() => {
        this.alertSucess = false;
        this.alertError = false;
      }, 3000);
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

.panel-category {
  color: white;
}

.checkbox-category {
  display: flex;
  justify-content: flex-start;
  padding: 16px 0 0 12px !important;
}

.checkbox-client {
  margin-right: 16px;
}

.alert-sucess {
  height: 38px !important;
  margin: 0px !important;
  display: flex;
  align-items: center;
  width: 250px;
}

.alert-error {
  margin: 0 16px;
  padding: 12px;
}

.btn-new-info {
  width: inherit;
}

.content-new-info {
  background-color: lavender;
}

@media (max-width: 480px) {
  .search-content {
    display: block;
  }

  .search-contact {
    margin-bottom: 8px !important;
  }

  .checkbox-category {
    padding: 0px 0 0 12px !important;
  }

  .content-form {
    padding: 0 12px 12px !important;
  }
}

@media (max-width: 800px) {
  .v-alert {
    display: none !important;
  }
}
</style>
