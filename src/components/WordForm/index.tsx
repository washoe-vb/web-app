import { useQueryString } from "hooks";
import { TextArea } from "../TextArea";

export const WordForm = () => {
  const [word, onWordChange] = useQueryString("word");
  const [definition, onDefinitionChange] = useQueryString("definition");
  const [example, onExampleChange] = useQueryString("example");

  return (
    <>
      <TextArea
        value={word}
        onChange={({ target }) => onWordChange(target.value)}
      />
      <TextArea
        value={definition}
        onChange={({ target }) => onDefinitionChange(target.value)}
      />
      <TextArea
        value={example}
        onChange={({ target }) => onExampleChange(target.value)}
      />
    </>
  );
};
