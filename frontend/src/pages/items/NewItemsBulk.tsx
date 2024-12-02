import { CloseOutlined } from '@ant-design/icons';
import { Plus } from '@phosphor-icons/react';
import {
  App,
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  FormProps,
  GetProp,
  Input,
  Select,
  Upload,
  UploadProps,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { newItem } from '../../services/ItemsServices';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const ItemTypes = [
  { label: 'Weapon', value: 'weapon' },
  { label: 'Armor', value: 'armor' },
  { label: 'Potion', value: 'potion' },
  { label: 'Accessory', value: 'accessory' },
  { label: 'Misc', value: 'misc' },
];

export default function NewItemsBulk() {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>('');

  const { message } = App.useApp();

  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      await newItem(values);
      message.success('Item created');
      form.resetFields();
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    getBase64(info.file as FileType, () => {});
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        onFinish={onFinish}
        layout="vertical"
        onFinishFailed={onFinishFailed}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div
              style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}
            >
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Item ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item
                    label="Name"
                    name={[field.name, 'name']}
                    rules={[
                      { required: true, message: 'Please enter the Item name' },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Type"
                    name={[field.name, 'type']}
                    rules={[
                      {
                        required: true,
                        message: "Type can't be empty",
                      },
                    ]}
                  >
                    <Select
                      options={ItemTypes}
                      placeholder="Select a type"
                      showSearch
                    />
                  </Form.Item>
                  <Form.Item>
                    <Flex justify="space-between" align="center">
                      <Form.Item
                        noStyle
                        layout="horizontal"
                        name={[field.name, 'equipable']}
                        valuePropName="checked"
                        rules={[
                          {
                            required: false,
                          },
                        ]}
                      >
                        <Checkbox>Equipable</Checkbox>
                      </Form.Item>
                    </Flex>
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    name={[field.name, 'description']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the item description',
                      },
                    ]}
                  >
                    <TextArea />
                  </Form.Item>
                  <Form.Item
                    label="Upload image"
                    name={[field.name, 'image']}
                    getValueFromEvent={({ file }) => file}
                  >
                    <Upload
                      accept="image/png, image/jpeg"
                      maxCount={1}
                      listType="picture-card"
                      showUploadList={false}
                      customRequest={(options: any) => {}}
                      beforeUpload={() => false}
                      onChange={handleChange}
                    >
                      {form.getFieldValue([field.name + 'image'])}
                      {
                        <span style={{ border: 0, background: 'none' }}>
                          <Plus weight="bold" size={16} />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </span>
                      }
                    </Upload>
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                + Add Item
              </Button>
            </div>
          )}
        </Form.List>

        <Form.Item label={null} wrapperCol={{ span: 12 }}>
          <Button block type="primary" shape="round" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
