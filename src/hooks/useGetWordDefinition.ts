import axios from "axios";
import { useQuery } from "react-query";

const engDictionaryPath = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const getWordDefinition = (word: string) =>
  axios.get(engDictionaryPath + word)
    .then(({ data }) => data);

export const useGetWordDefinition = (word: string) =>
  useQuery([ "get-definition" ], () => word && getWordDefinition(word), {
    refetchOnWindowFocus: false,
    cacheTime: Infinity
  });
