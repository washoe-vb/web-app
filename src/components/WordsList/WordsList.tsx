import { useState } from "react";
import Box from "@mui/material/Box";
import { useInfiniteQuery } from "react-query";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { useUpdateWord } from "../../api/queries/updateWord";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd";
import { AxiosResponse } from "axios";
import { useDeleteWord } from "../../api/queries/deleteWord";
import { Word } from "washoe-goods";
import { instance } from "api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import _TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider, styled } from "@mui/material";
import { TextArea } from "../../components/TextArea";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

type WordData = {
  words: Word[];
  count: number;
};

const LIMIT = 25;

function getNextPageParam(
  lastPage: AxiosResponse<WordData>,
  pages: Array<AxiosResponse<WordData>>
) {
  const { count: wordsInTotal } = lastPage.data;
  const wordsToSkip = pages.length * LIMIT;

  if (wordsInTotal > wordsToSkip) return wordsToSkip;
  return undefined;
}

export const WordsList = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "words",
    ({ pageParam = 0 }) =>
      instance.get("/word", { params: { skip: pageParam, limit: LIMIT } }),
    { getNextPageParam }
  );

  const words: Word[] =
    data?.pages.reduce<Array<Word>>((a, b) => a.concat(b.data.words), []) || [];

  const [wordId, setWordId] = useState("");

  interface EditWordCardProps {
    onClose?: () => void;
  }

  const EditWordCard = ({ onClose }: EditWordCardProps) => {
    const { mutate: deleteWord } = useDeleteWord();
    const { mutate: updateWord } = useUpdateWord();
    const [word, setWord] = useState(
      words.find(({ _id }) => _id === wordId)!.word
    );

    const [definition, setDefinition] = useState(
      words.find(({ _id }) => _id === wordId)!.definition
    );

    const [example, setExample] = useState(
      words.find(({ _id }) => _id === wordId)!.example
    );

    return (
      <Card>
        <CardHeader
          action={
            onClose && (
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            )
          }
          title="Edit word"
        />

        <TextArea
          value={word}
          onChange={(event) => setWord(event.target.value)}
        />
        <TextArea
          value={definition}
          onChange={(event) => setDefinition(event.target.value)}
        />
        <TextArea
          value={example}
          onChange={(event) => setExample(event.target.value)}
        />

        <Button onClick={() => deleteWord(wordId)}>Delete</Button>
        <Button
          onClick={() =>
            updateWord({
              word,
              definition: definition || "",
              example: example || "",
            })
          }
        >
          Save
        </Button>
      </Card>
    );
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal open={Boolean(wordId)} onClose={() => setWordId("")}>
        <Box sx={style}>
          <EditWordCard onClose={() => setWordId("")} />
        </Box>
      </Modal>
      <InfiniteScroll
        dataLength={words.length}
        next={fetchNextPage}
        hasMore={Boolean(hasNextPage)}
        loader={<Skeleton active />}
      >
        <TableContainer component={Paper} sx={{ padding: 0 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Word</TableCell>
                <TableCell>Definition/Example</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {words.map((word) => (
                <TableRow key={word._id} onClick={() => setWordId(word._id)}>
                  <TableCell component="th" scope="row">
                    {word.word}
                  </TableCell>
                  <TableCell>
                    {word.definition}
                    {Boolean(word.definition && word.example) && (
                      <Divider sx={{ margin: "4px" }} />
                    )}
                    <i>{word.example}</i>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </InfiniteScroll>
    </>
  );
};

const TableCell = styled(_TableCell)`
  font-size: 12px;
  padding: 4px 8px;
`;
