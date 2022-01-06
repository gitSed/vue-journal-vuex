/** Own */
import { EntryType, JournalModule } from "./types";

export const getEntriesByTerm =
  (state: JournalModule) =>
  (term = ""): Array<EntryType> => {
    if (term.length === 0) return state.entries;

    return state.entries.filter((entry) =>
      entry.text.toLowerCase().includes(term.toLowerCase())
    );
  };

export const getEntryById =
  (state: JournalModule) =>
  (entryId: string): EntryType | undefined => {
    const entry = state.entries.find((entry) => entry.id === entryId);

    if (!entry) return;

    return { ...entry };
  };
