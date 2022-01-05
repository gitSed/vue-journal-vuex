export type EntryType = {
  id: number;
  date: string;
  text: string;
  picture: string | null;
};

export type JournalModule = {
  isLoading: boolean;
  entries: Array<EntryType>;
};
