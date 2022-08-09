import { VFC } from "react";
import { useAddWord } from "hooks";
import { LoadingButton } from "@mui/lab";
import { Save as DeleteIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

type EntryCardType = {
  word: string;
  definition: string;
  synonyms: string[];
  example: undefined | string;
};

export const EntryCard: VFC<EntryCardType> = ({
  word,
  definition,
  example,
  synonyms,
}) => {
  const formattedSynonyms = Boolean(synonyms.length)
    ? " : " + JSON.stringify(synonyms)
    : "";
  const formattedDefinition = `: ${definition.toLowerCase()}${formattedSynonyms}`;
  const link = `/add-word?word=${word}&definition=${
    formattedDefinition || ""
  }&example=${example || ""}`;

  const { mutate: addWord, isLoading } = useAddWord();

  async function handleQuickAdd(): Promise<any> {
    addWord({ word, definition: formattedDefinition, example });
  }

  return (
    <Box sx={{ mb: 1 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body1">{formattedDefinition}</Typography>
          {example && (
            <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
              <ul>
                <li>
                  <i>{example}</i>
                </li>
              </ul>
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button component={RouterLink} to={link} size="large">
            Add
          </Button>
          <Button disabled={isLoading} onClick={handleQuickAdd} size="large">
            {isLoading ? "Adding..." : "Quick Add"}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
