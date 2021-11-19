import { VFC } from "react";
import { Form, Input, Button } from "antd";

export type AddWordFormValues = {
  word: string;
  meanings?: string[];
  examples?: string[];
}

type AddWordFormType = {
  onAddWord: (word: AddWordFormValues) => void;
}

export const AddWordForm: VFC<AddWordFormType> = ({ onAddWord }) => (
  <Form onFinish={onAddWord}>

    <Form.Item name="word" required>
      <Input placeholder="Word" />
    </Form.Item>

    <Form.Item name={[ "meanings", 0 ]}>
      <Input.TextArea placeholder="Meaning" />
    </Form.Item>

    <Form.Item name={[ "examples", 0 ]}>
      <Input.TextArea placeholder="Example" />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" style={{ width: "100%" }}>Add</Button>
    </Form.Item>
  </Form>
);
