/** Third-Party */
import { ActionContext } from "vuex";

/** Own */
import journalApi from "@/api/journalApi";
import { EntryType, JournalModule } from "./types";

export const loadEntries = async ({
  commit,
}: ActionContext<JournalModule, unknown>): Promise<void> => {
  const { data } = await journalApi.get("/entries.json");

  const entries = [];

  if (data) {
    for (const id of Object.keys(data)) {
      entries.push({
        id,
        ...data[id],
      });
    }
  }

  commit("setEntries", entries);
};

export const updateEntry = async (
  { commit }: ActionContext<JournalModule, unknown>,
  entry: EntryType
): Promise<void> => {
  const { status } = await journalApi.patch(`/entries/${entry.id}.json`, {
    date: entry.date,
    text: entry.text,
    picture: entry.picture,
  });

  if (status === 200) {
    commit("updateEntry", entry);
  }
};

export const createEntry = async (
  { commit }: ActionContext<JournalModule, unknown>,
  entry: Omit<EntryType, "id">
): Promise<string> => {
  const { data } = await journalApi.post(`/entries.json`, {
    date: entry.date,
    text: entry.text,
    picture: entry.picture,
  });

  const entryId = data.name;

  commit("addEntry", { ...entry, id: entryId });

  return entryId;
};

export const deleteEntry = async (
  { commit }: ActionContext<JournalModule, unknown>,
  entryId: string
): Promise<string | null> => {
  const { status } = await journalApi.delete(`/entries/${entryId}.json`);

  if (status === 200) {
    commit("deleteEntry", entryId);

    return entryId;
  }

  return null;
};
