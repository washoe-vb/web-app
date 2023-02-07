import { useMutation } from "react-query";
import { UnsavedWord } from "types";
import { instance } from "api";

export const useAddWord = () =>
  useMutation((Word: UnsavedWord) => instance.post("/word/create", Word));
