import InfiniteScroll from "react-infinite-scroll-component";
import { Table, Skeleton } from "antd";
import { useInfiniteQuery } from "react-query";
import { AxiosResponse } from "axios";
import { instance } from "api";

type Word = {
  word: string;
  example: string;
  meaning: string;
};

type WordData = {
  words: Word[];
  count: number;
};

const columns = [
  {
    title: <strong>Word</strong>,
    dataIndex: "word",
    key: "word"
  },
  {
    title: <strong>Meaning</strong>,
    dataIndex: "meaning",
    key: "meaning"
  },
  {
    title: <strong>Example</strong>,
    dataIndex: "example",
    key: "example"
  }
];

const LIMIT = 25;

function getNextPageParam (
  lastPage: AxiosResponse<WordData>,
  pages: Array<AxiosResponse<WordData>>
) {
  const { count: wordsInTotal } = lastPage.data;
  const wordsToSkip = pages.length * LIMIT;

  if (wordsInTotal > wordsToSkip) return wordsToSkip;
  return undefined;
}

export const WordsList = () => {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    "words",
    ({ pageParam = 0 }) => instance.get("/word", { params: { skip: pageParam, limit: LIMIT } }),
    { getNextPageParam }
  );

  const words: Word[] =
    data?.pages.reduce<Array<Word>>((a, b) => a.concat(b.data.words), []) || [];

  return (
    <InfiniteScroll
      dataLength={words.length}
      next={fetchNextPage}
      hasMore={Boolean(hasNextPage)}
      loader={<Skeleton active />}
    >
      <Table
        columns={columns}
        dataSource={words}
        pagination={false}
        bordered
        loading={status === "loading"}
        sticky // Doesn't work because of InfiniteScroll
      />
    </InfiniteScroll>
  );
};
