import { AddWordForm } from "components/AddWordForm";
import { useAddWord } from "hooks";
import { Centered } from "components/Centered";
import { Form, Typography, message } from "antd";
import { WordData } from "hooks/useAddWord";

const { Title } = Typography;

const removeEpmtyFields = ({ word, meaning, example }: WordData) => ({
  word,
  ...(meaning ? { meaning } : {}),
  ...(example ? { example } : {})
});

export const AddWord = () => {
  const { mutate: addWord, isLoading } = useAddWord();
  const [ form ] = Form.useForm();
  const { resetFields } = form;

  const onAddWord = (formValues: WordData) => {
    addWord(removeEpmtyFields(formValues), {
      onSuccess () {
        message.success("Success!");
        resetFields();
      },
      onError () {
        message.error("Something went wrong");
      }
    });
  };

  return (
    <Centered>
      <Title level={3} >Add a Word</Title>
      <AddWordForm onAddWord={onAddWord} isLoading={isLoading} form={form} />
    </Centered>
  );
};
