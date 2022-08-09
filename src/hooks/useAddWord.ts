import { useMutation } from "react-query";
import { DictionaryEntry } from "washoe-goods";
import { instance } from "api";

export const useAddWord = () =>
  useMutation((DictionaryEntry: DictionaryEntry) =>
    instance.post("/word/create", DictionaryEntry)
  );
