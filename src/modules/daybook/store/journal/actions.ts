/** Third-Party */
import { ActionContext } from "vuex";

/** Own */
import { JournalModule } from "./types";

export const loadEntries = async ({
  commit,
}: ActionContext<JournalModule, unknown>): Promise<void> => {};

export const updateEntry = async ({
  commit,
}: ActionContext<JournalModule, unknown>): Promise<void> => {};

export const createEntry = async ({
  commit,
}: ActionContext<JournalModule, unknown>): Promise<void> => {};
