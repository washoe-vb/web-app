import { instance } from "../";
import { useMutation } from "react-query";

export const useDeleteWord = () =>
  useMutation((id: string) => instance.delete(`/word/delete?id=${id}`));

// export const useWords = (options) =>
//   useInfiniteQuery(
//     "words",
//     ({ pageParam = 0 }) =>
//       instance.get("/word", { params: { skip: pageParam, limit: 25 } }),
//     options
//   );
