import { AddWordForm, AddWordFormValues } from "components/AddWordForm";
import { useAddWord } from "hooks";
import { Form } from "antd";

export const AddWord = () => {
  const { mutate: addWord, isLoading } = useAddWord();
  const [ form ] = Form.useForm();
  const { resetFields } = form;

  const onAddWord = (vals: AddWordFormValues) => addWord(vals, {
    onSuccess: () => resetFields()
  });

  return <AddWordForm onAddWord={onAddWord} isLoading={isLoading} form={form} />;
};
