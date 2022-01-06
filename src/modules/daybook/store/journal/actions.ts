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

  for (const id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id],
    });
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
  });

  if (status === 200) {
    commit("updateEntry", entry);
  }
};

export const createEntry = async ({
  commit,
}: ActionContext<JournalModule, unknown>): Promise<void> => {
  commit("");
};
