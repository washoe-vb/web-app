import { VFC } from "react";
import { Form, Input, Button, FormInstance } from "antd";

export type AddWordFormValues = {
  word: string;
  meanings?: string[];
  examples?: string[];
}

type AddWordFormType = {
  onAddWord: (word: AddWordFormValues) => void;
  isLoading: boolean;
  form: FormInstance;
}

export const AddWordForm: VFC<AddWordFormType> = ({ onAddWord, isLoading, form }) => (
  <Form form={form} onFinish={onAddWord} >

    <Form.Item name="word" required>
      <Input disabled={isLoading} placeholder="Word" />
    </Form.Item>

    <Form.Item name={[ "meanings", 0 ]}>
      <Input.TextArea disabled={isLoading} placeholder="Meaning" />
    </Form.Item>

    <Form.Item name={[ "examples", 0 ]}>
      <Input.TextArea disabled={isLoading} placeholder="Example" />
    </Form.Item>

    <Form.Item>
      <Button loading={isLoading} type="primary" htmlType="submit" style={{ width: "100%" }}>Add</Button>
    </Form.Item>
  </Form>
);
