import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { useUpdateWord } from "../../api/queries/updateWord";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd";
import { AxiosResponse } from "axios";
import { useDeleteWord } from "../../api/queries/deleteWord";
import { Word } from "../../types";
import { instance } from "api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import _TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider, styled } from "@mui/material";
import { Button } from "../Button";
import { Modal } from "../../components/Modal";
import { WordForm } from "components/WordForm";

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
  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery(
    "words",
    ({ pageParam = 0 }) =>
      instance.get("/word", { params: { skip: pageParam, limit: LIMIT } }),
    { getNextPageParam }
  );

  const words: Word[] =
    data?.pages.reduce<Array<Word>>((a, b) => a.concat(b.data.words), []) || [];

  const { mutate: deleteWord } = useDeleteWord();
  const { mutate: updateWord } = useUpdateWord();

  const [searchParams, setSearchParams] = useSearchParams();

  const { _id, word, definition, example } = Object.fromEntries(
    searchParams.entries()
  );

  const handleDeleteWord = () => {
    deleteWord(_id, { onSuccess: () => void refetch() });
    setSearchParams({});
  };

  const handleUpdateWord = () => {
    updateWord(
      { _id, word, definition, example },
      { onSuccess: () => void refetch() }
    );
    setSearchParams({});
  };

  return (
    <>
      <Modal
        title="Edit word"
        isOpen={Boolean(_id)}
        onClose={() => setSearchParams({})}
      >
        <WordForm />
        <Button color="danger" onClick={handleDeleteWord}>
          Delete
        </Button>
        <Button onClick={handleUpdateWord}>Save</Button>
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
              {words.map(({ _id, word, definition = "", example = "" }) => (
                <TableRow
                  key={_id}
                  onClick={() =>
                    setSearchParams(
                      new URLSearchParams({
                        _id,
                        word,
                        definition,
                        example,
                      })
                    )
                  }
                >
                  <TableCell component="th" scope="row">
                    {word}
                  </TableCell>
                  <TableCell>
                    {definition}
                    {Boolean(definition && example) && (
                      <Divider sx={{ margin: "4px" }} />
                    )}
                    <i>{example}</i>
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
