import {createStore} from "vuex";
import auth from "./modules/authModule";
import equipment from './modules/equipmentModule'
import alert from './modules/alertModule'

const store = createStore({
  modules: {
    equipment,
    auth,
    alert
  }
});

export default store