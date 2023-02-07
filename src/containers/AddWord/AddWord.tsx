import { useQueryString, useAddWord } from "hooks";
import { Form, Typography, message, Input, Button } from "antd";
import { Centered } from "components/Centered";
import { UnsavedWord } from "types";

const { Title } = Typography;

const removeEmptyFields = ({ word, definition, example }: UnsavedWord) => ({
  word,
  ...(definition ? { definition } : {}),
  ...(example ? { example } : {}),
});

export const AddWord = () => {
  const [word, onWordChange] = useQueryString("word");
  const [definition, onDefinitionChange] = useQueryString("definition");
  const [example, onExampleChange] = useQueryString("example");

  const { mutate: addWord, isLoading } = useAddWord();
  const [form] = Form.useForm();

  const handleAddWord = (formValues: UnsavedWord) => {
    addWord(removeEmptyFields(formValues), {
      onSuccess() {
        message.success("Success!");
        form.resetFields();
      },
      onError() {
        message.error("Something went wrong");
      },
    });
  };

  return (
    <>
      <Centered>
        <Title level={3}>Add a Word</Title>
        <Form
          form={form}
          initialValues={{ word, definition, example }}
          onFinish={handleAddWord}
        >
          <Form.Item name="word" required>
            <Input
              onChange={({ currentTarget }) =>
                onWordChange(currentTarget.value)
              }
              disabled={isLoading}
              placeholder="Word"
            />
          </Form.Item>
          <Form.Item name="definition" required>
            <Input.TextArea
              onChange={({ currentTarget }) =>
                onDefinitionChange(currentTarget.value)
              }
              disabled={isLoading}
              placeholder="Definition"
            />
          </Form.Item>
          <Form.Item name="example" required>
            <Input.TextArea
              onChange={({ currentTarget }) =>
                onExampleChange(currentTarget.value)
              }
              disabled={isLoading}
              placeholder="Example"
            />
          </Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Add
          </Button>
        </Form>
      </Centered>
    </>
  );
};
