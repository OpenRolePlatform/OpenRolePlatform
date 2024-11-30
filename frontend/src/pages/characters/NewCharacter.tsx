import { PlusOutlined } from '@ant-design/icons';
import {
  App,
  Button,
  Drawer,
  FloatButton,
  Form,
  FormProps,
  GetProp,
  Input,
  Select,
  Upload,
  UploadProps,
} from 'antd';
import { useState } from 'react';
import { usePlayer } from '../../components/PlayerContext';
import { newCharacter } from '../../services/CharacterServices';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const ClassesOptions = [
  { label: 'Barbarian', value: 'barbarian' },
  { label: 'Bard', value: 'bard' },
  { label: 'Cleric', value: 'cleric' },
  { label: 'Druid', value: 'druid' },
  { label: 'Fighter', value: 'fighter' },
  { label: 'Wizard', value: 'wizard' },
  { label: 'Monk', value: 'monk' },
  { label: 'Rogue', value: 'rogue' },
  { label: 'Paladin', value: 'paladin' },
  { label: 'Ranger', value: 'ranger' },
  { label: 'Sorcerer', value: 'sorcerer' },
  { label: 'Warlock', value: 'warlock' },
  { label: 'Artificer', value: 'artificer' },
];

const RacesOptions = [
  { label: 'Dwarf', value: 'dwarf' },
  { label: 'Elf', value: 'elf' },
  { label: 'Halfling', value: 'halfling' },
  { label: 'Human', value: 'human' },
  { label: 'Dragonborn', value: 'dragonborn' },
  { label: 'Gnome', value: 'gnome' },
  { label: 'Half-Elf', value: 'half-elf' },
  { label: 'Half-Orc', value: 'half-orc' },
  { label: 'Tiefling', value: 'tiefling' },
  { label: 'Aarakocra', value: 'aarakocra' },
  { label: 'Genasi', value: 'genasi' },
  { label: 'Goliath', value: 'goliath' },
  { label: 'Tabaxi', value: 'tabaxi' },
  { label: 'Triton', value: 'triton' },
  { label: 'Firbolg', value: 'firbolg' },
  { label: 'Kenku', value: 'kenku' },
  { label: 'Lizardfolk', value: 'lizardfolk' },
  { label: 'Changeling', value: 'changeling' },
  { label: 'Kalashtar', value: 'kalashtar' },
  { label: 'Shifter', value: 'shifter' },
  { label: 'Warforged', value: 'warforged' },
];

export default function NewCharacter() {
  const { message } = App.useApp();
  const playerContext = usePlayer();

  const [form] = Form.useForm();

  const [imageUrl, setImageUrl] = useState<string>('');
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const onFinish: FormProps['onFinish'] = async (values) => {
    const formData = new FormData();
    for (const name in values) {
      if (values[name]) formData.append(name, values[name]);
    }
    try {
      await newCharacter(formData);
      message.success('Character created');
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
        title="New Character"
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
          initialValues={{
            owner: playerContext.player?._id,
          }}
        >
          <Form.Item name="owner" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: 'Please enter the character name' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Class"
            name="class"
            rules={[
              {
                required: true,
                message: "Class can't be empty",
              },
            ]}
          >
            <Select
              options={ClassesOptions}
              placeholder="Select a class"
              showSearch
            />
          </Form.Item>
          <Form.Item
            label="Race"
            name="race"
            rules={[
              {
                required: true,
                message: "Race can't be empty",
              },
            ]}
          >
            <Select
              options={RacesOptions}
              placeholder="Select a race"
              showSearch
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
            <PlusOutlined />
          </>
        }
        onClick={() => setShowDrawer(true)}
        style={{ height: 60, width: 160 }}
        description="New character"
        shape="square"
        type="primary"
      />
    </>
  );
}
