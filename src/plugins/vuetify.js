import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "fa4",
  },
  theme: {
    themes: {
      light: {
        primary: colors.blue.lighten1,
      },
    },
  },
});
