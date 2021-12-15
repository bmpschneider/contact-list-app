import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: {},
    address: {},
    contactList: [
      {
        name: "Bruno Miguel Cliente",
        email: "brunopschneider@gmail.com",
        phoneNumber: "(48) 984562072",
        street: "João Pio Duarte Silva",
        district: "Córrego Grande",
        number: "844",
        city: "Florianópolis",
        state: "SC",
        cep: "88037000",
        phoneNumber2: "4898495329",
        client: true,
        favorite: false,
      },
      {
        name: "Stefani Marcelino Favorita",
        email: "stefanism5@hotmail.com",
        phoneNumber: "(48) 984562072",
        street: "Santos Saraiva",
        district: "Centro",
        number: "1302",
        city: "São José",
        state: "SC",
        cep: "88037000",
        phoneNumber2: "4898495329",
        client: false,
        favorite: true,
      },
      {
        name: "Josue Ferreira",
        email: "josue@hotmail.com",
        phoneNumber: "(48) 984562272",
        street: "Servidão Hercilio José Campos",
        district: "Centro",
        number: "22",
        city: "Florianópolis",
        state: "SC",
        cep: "88050515",
        phoneNumber2: "4898495329",
        client: false,
        favorite: true,
      },
      {
        name: "Abel Neto",
        email: "abel@hotmail.com",
        phoneNumber: "(48) 984562272",
        street: "Servidão Hercilio José Campos",
        district: "Centro",
        number: "18",
        city: "Florianópolis",
        state: "SC",
        cep: "88050515",
        phoneNumber2: "4898495329",
        client: false,
        favorite: true,
      },
      {
        name: "Rodrigo Fraga",
        email: "rodrigo@hotmail.com",
        phoneNumber: "(48) 984562272",
        street: "Servidão Hercilio José Campos",
        district: "Centro",
        number: "07",
        city: "Florianópolis",
        state: "SC",
        cep: "88050515",
        phoneNumber2: "4898495329",
        client: true,
        favorite: true,
      },
      {
        name: "Wagner Silva",
        email: "wagner@hotmail.com",
        phoneNumber: "(48) 984562272",
        street: "Servidão Hercilio José Campos",
        district: "Centro",
        number: "123",
        city: "Florianópolis",
        state: "SC",
        cep: "88050515",
        phoneNumber2: "4898495329",
        client: false,
        favorite: false,
      },
    ],
  },
  mutations: {
    SET_ADDRESS(state, address) {
      state.address = address;
    },
    SET_USERS(state, payload) {
      for (let i = 0; i < payload.length; i++) {
        console.log(payload[i], "get users");
        let newUser = {
          name: payload[i].name,
          email: payload[i].email,
          phoneNumber: payload[i].phone,
          street: payload[i].address.street,
          city: payload[i].address.city,
          number: payload[i].address.suite,
          cep: payload[i].address.zipcode,
        };
        state.contactList.push(newUser);
      }
    },
    SET_NEW_CONTACT(state, contact) {
      state.contactList.push(contact);
    },
    EDITED_LIST(state, newList) {
      state.contactList = newList;
    },
  },
  actions: {
    async getUsers({ commit }) {
      await axios.get(`https://jsonplaceholder.typicode.com/users`).then((response) => {
        commit("SET_USERS", response.data);
      });
    },
    async getAddress({ commit }, payload) {
      await axios.get(`https://viacep.com.br/ws/${payload}/json/`).then((response) => {
        if (response.data.erro) {
          commit("SET_ADDRESS", false);
        } else {
          commit("SET_ADDRESS", response.data);
        }
      });
    },
    async addNewContact({ commit }, payload) {
      commit("SET_NEW_CONTACT", payload);
    },
    async editedList({ commit }, payload) {
      commit("EDITED_LIST", payload);
    },
  },
});
