import { useQueryString, useGetWordDefinition } from "hooks";
import { EntryCard } from "../../components/EntryCard";
import {
  Stack,
  Link,
  TextField,
  FormControl,
  Box,
  Typography,
} from "@mui/material";

type WikiWordType = {
  word: string;
  phonetics: string[];
  meanings: Array<WikiMeaningType>;
};

type WikiMeaningType = {
  partOfSpeech: string;
  definitions: Array<WikiDefinitionType>;
  synonyms: string[];
  antonyms: string[];
};

type WikiDefinitionType = {
  definition: string;
  example?: string;
  synonyms: string[];
  antonyms: string[];
};

type ResultType = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data: WikiWordType[];
};

const Result = ({ isLoading, isError, isSuccess, data }: ResultType) => {
  if (isError) return <span>Error occured</span>;
  if (isLoading) return <span>Loading...</span>;
  if (!data.length) return <span>"Empty data</span>;
  if (!isSuccess) return <span>Enter some word to see it definition</span>;

  return (
    <>
      {data.map(({ word, ...instance }: WikiWordType) =>
        instance.meanings.map((meaning: WikiMeaningType, idx) => (
          <Box key={idx}>
            <Typography variant="h5">{meaning.partOfSpeech}</Typography>
            {meaning.definitions.map((definition: any, idx: number) => (
              <EntryCard
                key={idx}
                word={word}
                definition={definition.definition}
                synonyms={definition.synonyms}
                example={definition.example}
              />
            ))}
          </Box>
        ))
      )}
    </>
  );
};

export const Dictionary = () => {
  const [word, onWordChange] = useQueryString("word");
  const { isError, isLoading, isSuccess, data } = useGetWordDefinition(word);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onWordChange(data.get("word") as string);
  };

  return (
    <>
      <Box sx={{ mb: 4 }} component="form" onSubmit={handleSubmit} noValidate>
        <FormControl fullWidth>
          <TextField
            variant="standard"
            name="word"
            defaultValue={word}
            autoFocus
            margin="normal"
          />
        </FormControl>
      </Box>

      <Result
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        data={data}
      />
    </>
  );
};
