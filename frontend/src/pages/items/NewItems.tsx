import { PlusOutlined } from '@ant-design/icons';
import {
  App,
  Button,
  Checkbox,
  Drawer,
  FloatButton,
  Form,
  FormProps,
  GetProp,
  Input,
  Select,
  Space,
  Switch,
  Upload,
  UploadProps,
} from 'antd';
import { useState } from 'react';
import { newItem } from '../../services/ItemsServices';
import NewItemsBulk from './NewItemsBulk';

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

export default function NewItems() {
  const [form] = Form.useForm();
  const [bulkInsert, setBulkInsert] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const { message } = App.useApp();

  const onFinish: FormProps['onFinish'] = async (values) => {
    const formData = new FormData();
    for (const name in values) {
      if (values[name]) formData.append(name, values[name]);
    }
    try {
      await newItem(formData);
      message.success('Item created');
      setShowDrawer(false);
      form.resetFields();
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    getBase64(info.file as FileType, (url) => {
      setImageUrl(url);
    });
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Drawer
        placement="bottom"
        size="large"
        title="New Item"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        extra={
          <>
            <Space>
              Bulk Insert
              <Switch onChange={(checked) => setBulkInsert(checked)} />
            </Space>
          </>
        }
      >
        {bulkInsert ? (
          <NewItemsBulk />
        ) : (
          <Form
            form={form}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            onFinish={onFinish}
            layout="vertical"
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: 'Please enter the Item name' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Class can't be empty",
                },
              ]}
            >
              <Select
                options={ItemTypes}
                placeholder="Select a type"
                showSearch
              />
            </Form.Item>
            <Form.Item
              label="Equipable"
              name="equipable"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Checkbox />
            </Form.Item>

            <Form.Item
              label="Upload image"
              name="image"
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
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  <span style={{ border: 0, background: 'none' }}>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </span>
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              label={null}
              //labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              <Button block type="primary" shape="round" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Drawer>
      <FloatButton
        icon={
          <>
            <PlusOutlined />
          </>
        }
        onClick={() => setShowDrawer(true)}
        style={{ height: 60, width: 160 }}
        description="New item"
        shape="square"
        type="primary"
      />
    </>
  );
}
