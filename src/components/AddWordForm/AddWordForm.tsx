import { VFC } from "react";
import { useSyncInputWithQueryString } from "hooks";
import { Form, Input, Button, FormInstance } from "antd";
import { WordData } from "hooks/useAddWord";

type AddWordFormType = {
  onAddWord: (WordData: WordData) => void;
  isLoading: boolean;
  form: FormInstance;
}

export const AddWordForm: VFC<AddWordFormType> = ({ onAddWord, isLoading, form }) => {
  const [ word, onWordChange ] = useSyncInputWithQueryString("word");
  const [ definition, onDefinitionChange ] = useSyncInputWithQueryString("definition");
  const [ example, onExampleChange ] = useSyncInputWithQueryString("example");

  return (
    <Form form={form} onFinish={onAddWord} >

      <Form.Item name="word" required>
        <Input defaultValue={word} onChange={onWordChange} disabled={isLoading} placeholder="Word" />
      </Form.Item>

      <Form.Item name="meaning">
        <Input.TextArea defaultValue={definition} onChange={onDefinitionChange} disabled={isLoading} placeholder="Meaning" />
      </Form.Item>

      <Form.Item name="example">
        <Input.TextArea defaultValue={example} onChange={onExampleChange} disabled={isLoading} placeholder="Example" />
      </Form.Item>

      <Form.Item>
        <Button loading={isLoading} type="primary" htmlType="submit" style={{ width: "100%" }}>Add</Button>
      </Form.Item>
    </Form>
  );
};
