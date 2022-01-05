/** Third-Party */
import { createStore } from "vuex";

/** Own */
import journal from "@/modules/daybook/store/journal";

const store = createStore({
  modules: {
    journal,
  },
});

export default store;
