import { FileArrowUp, Plus } from '@phosphor-icons/react';
import { Button, Drawer, Form, FormProps, Input, message, Upload } from 'antd';
import { useState } from 'react';
import { Player } from '../models/PlayerModels';
import { newPlayer } from '../services/PlayerServices';
import { GetFieldFile } from '../utils/images';

const NewPlayer: React.FC<{ players: Array<Player>; refresh: () => void }> = ({
  players,
  refresh,
}) => {
  const [form] = Form.useForm();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

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
