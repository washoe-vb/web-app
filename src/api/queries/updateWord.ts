import { instance } from "../";
import { useMutation } from "react-query";

interface Data {
  _id: string;
  word?: string;
  definition?: string;
  example?: string;
}

export const useUpdateWord = () =>
  useMutation((data: Data) => instance.patch("/word/update", data));
