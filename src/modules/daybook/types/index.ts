/** Own */
import { EntryType } from "../store/journal/types";

export type EntryListComponentType = {
  getEntriesByTerm: (term: string) => EntryType;
  term: string;
};

export type EntryViewDataType = {
  entry: EntryType | null;
  localImage: string | ArrayBuffer | null;
  file: Blob | null;
};

export type DayMonthYearType = {
  day: number;
  month: string;
  year: string;
};
