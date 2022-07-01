import { VFC } from "react";
import { useSyncInputWithQueryString, useDebounce } from "hooks";
import { useWordMeaning } from "api/queries/getWordMeaning";
import { Link } from "react-router-dom";


type WikiWordType = {
  word: string,
  phonetics: string[],
  meanings: Array<WikiMeaningType>,
}

type WikiMeaningType = {
  partOfSpeech: string,
  definitions: Array<WikiDefinitionType>,
  synonyms: string[],
  antonyms: string[],
}

type WikiDefinitionType = {
  definition: string,
  example?: string;
  synonyms: string[];
  antonyms: string[];
}


// function meaningMapper (meaning: WikiMeaningType) {
//   return meaning.definitions.map((def: WikiDefinitionType) => ({
//     partOfSpeech: meaning.partOfSpeech,
//     definition: def.definition,
//     synonyms: def.synonyms,
//     examples: def.example ? [ def.example ] : []
//   }));
// }


//type MeaningType = {
//  definition: string,
//  partOfSpeech: string,
//  synonyms: string[],
//  examples: string[],
//  }

type DefinitionTypes = {
  definition: string;
  synonyms: string[];
  examples: undefined | string[];
}

const Definition: VFC<DefinitionTypes> = ({ definition, synonyms, examples }) => (
  <>
    <li>
      {definition}
      {synonyms && " : " + JSON.stringify(synonyms.map(s => s.toUpperCase()))}
    </li>
    {examples && <ul>{examples.map((example, idx) => <li key={idx}>{example}</li>)}</ul>}
  </>
);

const Result = ({ word }: { word: string }) => {

  const debouncedWord = useDebounce(word, 1000);
  const { isError, isLoading, isSuccess, data } = useWordMeaning(debouncedWord);

  if (isError) return <span>Error occured</span>;
  if (isLoading) return <span>Loading...</span>;
  if (!isSuccess) return <span>Enter some word to see it definition</span>;

  return (
    <>
      {data.map(({ word, ...instance }: WikiWordType) => instance.meanings.map((meaning: any) => {
        const { partOfSpeech } = meaning;
        return (
          <>
            <h2>{partOfSpeech}</h2>
            <ul>
              {meaning.definitions.map((definition: any, idx: number) =>
                <Link to={`/add-word?word=${word}&definition=${definition.definition || ""}&example=${definition.example || ""}`}>
                  <Definition
                    key={idx}
                    definition={definition.definition}
                    synonyms={Boolean(definition.synonyms.length) && definition.synonyms}
                    examples={definition.example && [ definition.example ]}/>
                </Link>
              )}
            </ul>
          </>
        );
      }
      ))}
    </>
  );
};




export const Dictionary = () => {
  const [ word, onWordChange ] = useSyncInputWithQueryString("word");

  return (
    <>
      <input type="text" value={word} onChange={onWordChange} />
      <Result word={word} />
    </>
  );
};
