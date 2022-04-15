import { createStore } from "vuex";
import auth from "./auth.module";
import equipment from "./equipment.module";

const store = createStore({
  modules: {
    auth,
    equipment
  }
});

export default store;