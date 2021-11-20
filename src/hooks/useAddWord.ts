import { AddWordFormValues } from "components/AddWordForm";
import { useMutation } from "react-query";
import { instance } from "api";

export const useAddWord = () => useMutation(
  (formValues: AddWordFormValues) => instance.post("/word/create", formValues)
);

