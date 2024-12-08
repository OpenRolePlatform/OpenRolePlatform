import { FileArrowUp, Plus, X } from '@phosphor-icons/react';
import {
  App,
  Button,
  Card,
  Checkbox,
  Drawer,
  Flex,
  FloatButton,
  Form,
  FormListFieldData,
  FormProps,
  Input,
  InputNumber,
  Select,
  Space,
  Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { useSelectedCharacter } from '../../components/CharacterContext';
import { newItem } from '../../services/ItemsServices';
import { GetFieldFile } from '../../utils/images';

const ItemTypes = [
  { label: 'Weapon', value: 'weapon' },
  { label: 'Armor', value: 'armor' },
  { label: 'Potion', value: 'potion' },
  { label: 'Accessory', value: 'accessory' },
  { label: 'Misc', value: 'misc' },
];

const DamageTypes = [
  { label: 'Acid', value: 'acid' },
  { label: 'Bludgeoning', value: 'bludgeoning' },
  { label: 'Cold', value: 'cold' },
  { label: 'Fire', value: 'fire' },
  { label: 'Force', value: 'force' },
  { label: 'Lightning', value: 'lightning' },
  { label: 'Necrotic', value: 'necrotic' },
  { label: 'Piercing', value: 'piercing' },
  { label: 'Poison', value: 'poison' },
  { label: 'Psychic', value: 'psychic' },
  { label: 'Radiant', value: 'radiant' },
  { label: 'Slashing', value: 'slashing' },
  { label: 'Thunder', value: 'thunder' },
];

const DicesTypes = [
  { label: 'D4', value: 4 },
  { label: 'D6', value: 6 },
  { label: 'D8', value: 8 },
  { label: 'D10', value: 10 },
  { label: 'D12', value: 12 },
  { label: 'D20', value: 20 },
];

export default function NewItems(props: { ownerID?: string }) {
  const [form] = Form.useForm();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const characterContext = useSelectedCharacter();

  const { message } = App.useApp();

  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      let items = values;
      if (props.ownerID) {
        console.log(props.ownerID);
        items = {
          items: values.items.map((item) => {
            return { owner: props.ownerID, ...item };
          }),
        };
      }
      await newItem(items);
      message.success('Item created');
      setShowDrawer(false);
      form.resetFields();
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const ItemForm = ({ field }: { field: FormListFieldData }) => {
    return (
      <>
        <Form.Item
          label="Name"
          name={[field.name, 'name']}
          rules={[
            {
              required: true,
              message: 'Please enter the Item name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Flex gap={16} align="end" wrap>
          <Form.Item
            layout="horizontal"
            label="Type"
            name={[field.name, 'type']}
            style={{ flex: 1 }}
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

          <Form.Item
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
        <Form.Item>
          <Flex wrap gap={16}>
            <Form.Item label="Bonus" name={[field.name, 'bonus']}>
              <InputNumber defaultValue={0} />
            </Form.Item>
            <Form.Item
              label="Dices"
              name={[field.name, 'damage', 'damage_dice_quantity']}
            >
              <InputNumber defaultValue={1} />
            </Form.Item>
            <Form.Item
              label="Dices"
              name={[field.name, 'damage', 'damage_dice_sides']}
            >
              <Select
                options={DicesTypes}
                placeholder="Select a dice"
                showSearch
              />
            </Form.Item>
            <Form.Item
              label="Damage addition"
              name={[field.name, 'damage', 'damage_addition']}
            >
              <InputNumber defaultValue={0} />
            </Form.Item>
            <Form.Item
              label="Damage type"
              name={[field.name, 'damage', 'damage_type']}
            >
              <Select
                options={DamageTypes}
                placeholder="Select a type of damage"
                showSearch
              />
            </Form.Item>
          </Flex>
        </Form.Item>
        <Form.Item label="Description" name={[field.name, 'description']}>
          <TextArea />
        </Form.Item>
        <Form.Item
          label="Upload image"
          name={[field.name, 'image']}
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
      </>
    );
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
              <Button
                block
                type="primary"
                shape="round"
                onClick={() => form.submit()}
              >
                Submit
              </Button>
            </Space>
          </>
        }
      >
        <Form
          form={form}
          style={{ maxWidth: 600 }}
          autoComplete="off"
          onFinish={onFinish}
          layout="horizontal"
          onFinishFailed={onFinishFailed}
          initialValues={{ items: [{}] }}
        >
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <div
                style={{
                  display: 'flex',
                  rowGap: 16,
                  flexDirection: 'column',
                }}
              >
                {fields.length > 1 ? (
                  <>
                    {fields.map((field) => (
                      <Card
                        size="small"
                        title={`Item ${field.name + 1}`}
                        key={field.key}
                        extra={
                          <Button
                            icon={<X size={16} weight="bold" />}
                            onClick={() => {
                              remove(field.name);
                            }}
                            type="text"
                            danger
                          />
                        }
                      >
                        <ItemForm field={field} />
                      </Card>
                    ))}
                  </>
                ) : (
                  <>
                    {fields.map((field) => (
                      <ItemForm field={field} />
                    ))}
                  </>
                )}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<Plus size={16} weight="bold" />}
                >
                  Add Item
                </Button>
              </div>
            )}
          </Form.List>
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
        description="New item"
        shape="square"
        type="primary"
      />
    </>
  );
}
