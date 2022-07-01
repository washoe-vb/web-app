import { VFC } from "react";
import { Form, Input, Button, FormInstance } from "antd";
import { WordData } from "hooks/useAddWord";

type AddWordFormType = {
  onAddWord: (WordData: WordData) => void;
  isLoading: boolean;
  form: FormInstance;
}

export const AddWordForm: VFC<AddWordFormType> = ({ onAddWord, isLoading, form }) => (
  <Form form={form} onFinish={onAddWord} >

    <Form.Item name="word" required>
      <Input disabled={isLoading} placeholder="Word" />
    </Form.Item>

    <Form.Item name="meaning">
      <Input.TextArea disabled={isLoading} placeholder="Meaning" />
    </Form.Item>

    <Form.Item name="example">
      <Input.TextArea disabled={isLoading} placeholder="Example" />
    </Form.Item>

    <Form.Item>
      <Button loading={isLoading} type="primary" htmlType="submit" style={{ width: "100%" }}>Add</Button>
    </Form.Item>
  </Form>
);
