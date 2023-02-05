import { useState } from "react";
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
import { Modal } from "../../components/Modal";

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

  const EditWord = ({ onClose }: EditWordCardProps) => {
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
    // <TextArea />
    // <TextArea />
    // <Button variant="contained" color="error" size="large">
    //   Delete
    // </Button>
    // <Button variant="contained" color="primary" size="large">
    //   Save
    // </Button>

    return (
      <>
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

        <Button
          size="large"
          variant="contained"
          color="error"
          onClick={() => deleteWord(wordId)}
        >
          Delete
        </Button>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() =>
            updateWord({
              _id: wordId,
              word,
              definition: definition || "",
              example: example || "",
            })
          }
        >
          Save
        </Button>
      </>
    );
  };

  return (
    <>
      <Modal isOpen={Boolean(wordId)} onClose={() => setWordId("")}>
        <EditWord />
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
