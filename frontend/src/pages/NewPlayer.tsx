import { PlusOutlined } from '@ant-design/icons';
import { Plus } from '@phosphor-icons/react';
import {
  App,
  Button,
  Drawer,
  Form,
  FormProps,
  GetProp,
  Input,
  Upload,
  UploadProps,
} from 'antd';
import { useState } from 'react';
import { Player } from '../models/PlayerModels';
import { newPlayer } from '../services/PlayerServices';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const NewPlayer: React.FC<{ players: Array<Player>; refresh: () => void }> = ({
  players,
  refresh,
}) => {
  const [form] = Form.useForm();

  const [imageUrl, setImageUrl] = useState<string>('');
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const { message } = App.useApp();

  const onFinish: FormProps['onFinish'] = async (values) => {
    const formData = new FormData();
    for (const name in values) {
      if (values[name]) formData.append(name, values[name]);
    }
    try {
      await newPlayer(formData);
      message.success('Player created');
      setShowDrawer(false);
      refresh();
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

  const [validName, setValidName] = useState(true);

  return (
    <>
      <Drawer
        placement="bottom"
        size="large"
        title="New Player"
        open={showDrawer}
        extra={
          <Button
            block
            type="primary"
            shape="round"
            onClick={() => form.submit()}
          >
            Submit
          </Button>
        }
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
            validateStatus={validName ? 'success' : 'error'}
            help={!validName && 'The name must be unique'}
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input
              onChange={(e) => {
                setValidName(
                  players.find((player) => player.name === e.target.value)
                    ? false
                    : true,
                );
              }}
            />
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
        </Form>
      </Drawer>
      <Button
        icon={<Plus weight="bold" />}
        onClick={() => setShowDrawer(true)}
        shape="round"
        size="large"
        block
        type="text"
        variant="filled"
      >
        New Player
      </Button>
    </>
  );
};

export default NewPlayer;
