import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd";
import { useInfiniteQuery } from "react-query";
import { AxiosResponse } from "axios";
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

  const handleRowClick = (id: string) => null;

  return (
    <>
      <InfiniteScroll
        dataLength={words.length}
        next={fetchNextPage}
        hasMore={Boolean(hasNextPage)}
        loader={<Skeleton active />}
      >
        <TableContainer
          component={Paper}
          sx={{ padding: 0, marginTop: "56px" }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Word</TableCell>
                <TableCell>Definition/Example</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {words.map((word) => (
                <TableRow
                  key={word._id}
                  onClick={() => handleRowClick(word._id)}
                >
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
