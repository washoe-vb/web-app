import axios from "axios";
import { useQuery } from "react-query";

const engDictionaryPath = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const getWordMeaning = (word: string) =>
  axios.get(engDictionaryPath + word)
    .then(({ data }) => data);

export const useWordMeaning = (word: string) =>
  useQuery([ "get-meaning", word ], () => getWordMeaning(word), {
    enabled: Boolean(word),
    cacheTime: Infinity,
    refetchOnWindowFocus: false
  });
