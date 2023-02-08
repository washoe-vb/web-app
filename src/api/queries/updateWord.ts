import { instance } from "../";
import { useMutation, QueryClient } from "react-query";

const queryClient = new QueryClient();

interface Data {
  _id: string;
  word?: string;
  definition?: string;
  example?: string;
}

export const useUpdateWord = () =>
  useMutation((data: Data) => instance.patch("/word/update", data), {
    onSuccess: () =>
      queryClient.invalidateQueries("words", { refetchInactive: true }),
  });
