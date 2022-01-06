/** Own */
import { EntryType, JournalModule } from "./types";

export const setEntries = (
  state: JournalModule,
  entries: Array<EntryType>
): void => {
  state.entries = [...state.entries, ...entries];
  state.isLoading = false;
};

export const updateEntry = (
  state: JournalModule,
  entryObj: EntryType
): void => {
  state.entries = state.entries.map((entry) => {
    if (entry.id === entryObj.id) {
      return {
        id: entry.id,
        date: entryObj.date,
        picture: entryObj.picture,
        text: entryObj.text,
      };
    }

    return entry;
  });
};

export const addEntry = (state: JournalModule): void => {
  state.entries.push(state.entries[0]);
};
