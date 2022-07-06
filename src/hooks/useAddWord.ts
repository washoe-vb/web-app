import { useMutation } from "react-query";
import { instance } from "api";

export type WordData = {
  word: string;
  definition?: string;
  example?: string;
}

export const useAddWord = () => useMutation(
  (WordData: WordData) => instance.post("/word/create", WordData)
);

