/** Third-Party */
import { Module } from "vuex";

/** Own */
import { JournalModule } from "./types";
import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";
import state from "./state";

const journalModule: Module<JournalModule, unknown> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default journalModule;
