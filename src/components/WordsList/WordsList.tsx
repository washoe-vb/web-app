import InfiniteScroll from "react-infinite-scroll-component";
import { Table, Skeleton } from "antd";
import { useInfiniteQuery } from "react-query";
import { AxiosResponse } from "axios";
import { Word } from "washoe-goods";
import { instance } from "api";

type WordData = {
  words: Word[];
  count: number;
};

const columns = [
  {
    title: <strong>Word</strong>,
    dataIndex: "word",
    key: "word",
  },
  {
    title: <strong>Definition</strong>,
    dataIndex: "definition",
    key: "definition",
  },
  {
    title: <strong>Example</strong>,
    dataIndex: "example",
    key: "example",
  },
];

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
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    "words",
    ({ pageParam = 0 }) =>
      instance.get("/word", { params: { skip: pageParam, limit: LIMIT } }),
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
        rowKey={({ _id }) => _id}
        pagination={false}
        bordered
        loading={status === "loading"}
        sticky // Doesn't work because of InfiniteScroll
      />
    </InfiniteScroll>
  );
};
