import { instance } from "../";
import { useMutation } from "react-query";

interface Data {
  word: string;
  definition: string;
  example: string;
}

export const useUpdateWord = () =>
  useMutation((data: Data) => instance.put("/word/update", data));
