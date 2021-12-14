import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    adress: {},
    contactList: [
      {
        name: "Bruno Miguel Cliente",
        email: "brunopschneider@gmail.com",
        phoneNumber: "(48) 984562072",
        street: "João Pio Duarte Silva",
        city: "Florianópolis",
        cep: "88037000",
        phoneNumber2: "4898495329",
        clients: true,
        favorites: false,
      },
      {
        name: "Stefani Marcelino Favorita",
        email: "stefanism5@hotmail.com",
        phoneNumber: "(48) 984562072",
        street: "Santos Saraiva",
        number: "1302",
        city: "São José",
        cep: "88037000",
        phoneNumber2: "4898495329",
        clients: false,
        favorites: true,
      },
    ],
  },
  mutations: {
    SET_ADRESS(state, adress) {
      state.adress = adress;
    },
  },
  actions: {
    async getAdress({ commit }, payload) {
      await axios.get(`https://viacep.com.br/ws/${payload}/json/`).then((response) => {
        console.log(response.data, "resposta cep");
        commit("SET_ADRESS", response.data);
      });
    },
  },
});
