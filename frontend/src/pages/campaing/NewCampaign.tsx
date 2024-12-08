import { FileArrowUp, Plus } from '@phosphor-icons/react';
import {
  Button,
  Drawer,
  FloatButton,
  Form,
  FormProps,
  Input,
  message,
  Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { newCampaign } from '../../services/CampaignServices';
import { GetFieldFile } from '../../utils/images';

export default function NewCampaign() {
  const [form] = Form.useForm();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      await newCampaign(values);
      message.success('Campaign created');
      setShowDrawer(false);
      form.resetFields();
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Drawer
        placement="bottom"
        size="large"
        title="New Campaign"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
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
              { required: true, message: 'Please enter the campaign name' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please enter a campaign description',
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="Upload image"
            name="image"
            getValueFromEvent={GetFieldFile}
          >
            <Upload
              multiple={false}
              accept="image/png, image/jpeg"
              maxCount={1}
              customRequest={(options: any) => {}}
              beforeUpload={() => false}
              listType="picture"
            >
              <Button icon={<FileArrowUp size={16} />}>Click to upload</Button>
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
      </Drawer>
      <FloatButton
        icon={
          <>
            <Plus size={32} weight="bold" />
          </>
        }
        onClick={() => setShowDrawer(true)}
        style={{ height: 60, width: 160 }}
        description="New campaign"
        shape="square"
        type="primary"
      />
    </>
  );
}
