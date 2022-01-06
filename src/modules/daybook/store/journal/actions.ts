/** Third-Party */
import { ActionContext } from "vuex";

/** Own */
import { JournalModule } from "./types";

export const loadEntries = async ({
  commit,
}: ActionContext<JournalModule, unknown>): Promise<void> => {
  commit("");
};

export const updateEntry = async ({
  commit,
}: ActionContext<JournalModule, unknown>): Promise<void> => {
  commit("");
};

export const createEntry = async ({
  commit,
}: ActionContext<JournalModule, unknown>): Promise<void> => {
  commit("");
};
