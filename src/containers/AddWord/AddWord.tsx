import { useAddWord } from "hooks";
import { Button } from "../../components/Button";
import { useSearchParams } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { WordForm } from "components/WordForm";
import { UnsavedWord } from "types";

const removeEmptyFields = ({ word, definition, example }: UnsavedWord) => ({
  word,
  ...(definition ? { definition } : {}),
  ...(example ? { example } : {}),
});

export const AddWord = () => {
  const { mutate: addWord } = useAddWord();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleAddWord = () => {
    const { word, definition, example } = Object.fromEntries(
      searchParams.entries()
    );
    addWord(removeEmptyFields({ word, definition, example }), {
      onSuccess: () => setSearchParams({}),
    });
  };

  return (
    <Modal title="Add word" isOpen>
      <WordForm />
      <Button onClick={handleAddWord}>Add</Button>
    </Modal>
  );
};
