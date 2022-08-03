import { useQueryString, useGetWordDefinition } from "hooks";
import { VFC } from "react";
import { Link } from "react-router-dom";
import { Form, Input } from "antd";

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

type DefinitionTypes = {
  definition: string;
  synonyms: string[];
  examples: undefined | string[];
};

const Definition: VFC<DefinitionTypes> = ({
  definition,
  synonyms,
  examples,
}) => (
  <>
    <li>
      {definition}
      {synonyms && " : " + JSON.stringify(synonyms.map((s) => s.toUpperCase()))}
    </li>
    {examples && (
      <ul>
        {examples.map((example, idx) => (
          <li key={idx}>{example}</li>
        ))}
      </ul>
    )}
  </>
);

type ResultType = {
  isLoading: boolean;
  isError: boolean;
  data: WikiWordType[];
};

const Result = ({ isLoading, isError, data }: ResultType) => {
  if (isError) return <span>Error occured</span>;
  if (isLoading) return <span>Loading...</span>;
  if (!data.length) return <span>"Empty data</span>;
  // if (!isSuccess) return <span>Enter some word to see it definition</span>;

  return (
    <>
      {data.map(({ word, ...instance }: WikiWordType) =>
        instance.meanings.map((meaning: any) => {
          const { partOfSpeech } = meaning;
          return (
            <>
              <h2>{partOfSpeech}</h2>
              <ul>
                {meaning.definitions.map((definition: any, idx: number) => (
                  <Link
                    to={`/add-word?word=${word}&definition=${
                      definition.definition || ""
                    }&example=${definition.example || ""}`}
                  >
                    <Definition
                      key={idx}
                      definition={definition.definition}
                      synonyms={
                        Boolean(definition.synonyms.length) &&
                        definition.synonyms
                      }
                      examples={definition.example && [definition.example]}
                    />
                  </Link>
                ))}
              </ul>
            </>
          );
        })
      )}
    </>
  );
};

export const Dictionary = () => {
  const [word, onWordChange] = useQueryString("word");
  const { isError, isLoading, data } = useGetWordDefinition(word);
  const [form] = Form.useForm();

  return (
    <>
      <Form form={form} onFinish={({ word }) => onWordChange(word)}>
        <Form.Item name="word">
          <Input
            type="text"
            defaultValue={word}
            disabled={isLoading}
            placeholder="Enter a word"
          />
        </Form.Item>
      </Form>

      <Result isLoading={isLoading} isError={isError} data={data} />
    </>
  );
};
