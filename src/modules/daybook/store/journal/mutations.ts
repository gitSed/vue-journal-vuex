/** Own */
import { JournalModule } from "./types";

export const setEntries = (state: JournalModule): void => {
  state.entries = [];
};

export const updateEntry = (state: JournalModule): void => {
  state.entries[0] = state.entries[1];
};

export const addEntry = (state: JournalModule): void => {
  state.entries.push(state.entries[0]);
};
