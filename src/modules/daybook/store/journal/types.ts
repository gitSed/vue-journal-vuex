export type EntryType = {
  id: string;
  date: string;
  text: string;
  picture: string | null;
};

export type JournalModule = {
  isLoading: boolean;
  entries: Array<EntryType>;
};
