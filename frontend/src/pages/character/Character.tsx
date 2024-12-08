//react imports
import { useState } from 'react';
import './Character.scss';

//components imports
import { Seal, Sparkle, TreasureChest } from '@phosphor-icons/react';
import {
  Button,
  Col,
  Descriptions,
  Drawer,
  Flex,
  Image,
  InputNumber,
  Row,
  Typography,
} from 'antd';
import { useParams } from 'react-router-dom';
import { useSelectedCharacter } from '../../components/CharacterContext.tsx';
import ItemsList from '../../components/ItemsList.tsx';
import { StatsList } from '../../models/CharacterModels.ts';
import { Item } from '../../models/ItemsModels.ts';
import { getItems } from '../../services/ItemsServices.ts';
import { useCharacter } from '../../services/useCharacter.ts';
import { useDynamicList } from '../../services/useDynamicList.ts';
import { getBackendImage } from '../../utils/images.ts';
import NewItems from '../items/NewItems.tsx';
import SkillsMenu from './SkillsMenu.tsx';
import { AltStats, HpMenu, StatsCardGroup } from './StatsComponents.tsx';

export default function Character() {
  const characterContext = useSelectedCharacter();

  const { characterID } = useParams();
  const character = useCharacter(characterID ?? 'default');

  const items = useDynamicList<Item>('item', getItems, {
    owner: characterContext.character()._id,
  });
  const [showSkills, setShowSkills] = useState(false);
  const [showItems, setShowItems] = useState(false);

  return (
    <>
      {/* general row */}
      <Col>
        <Row align="stretch" gutter={16} wrap={false}>
          <Col xs={{ flex: '150px' }} sm={{ flex: '150px' }}>
            <Image
              style={{ borderRadius: '12px' }}
              src={getBackendImage(character.character().image!)}
              fallback=" DEFAULT_AVATAR"
            />
          </Col>
          <Col flex={1}>
            <Descriptions
              bordered
              title={
                <Typography.Title style={{ margin: 0 }} level={3}>
                  {character.name}
                </Typography.Title>
              }
              column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
              size="small"
              items={[
                { label: 'Level', children: character.character().level },
                {
                  label: 'Race',
                  children: character.character().race?.toUpperCase(),
                },
                {
                  label: 'Class',
                  children: character.character().class?.toUpperCase(),
                },
              ]}
            ></Descriptions>
          </Col>
        </Row>
        <br />
        <StatsCardGroup character={character} statsList={StatsList} />
        <AltStats character={character} />
        <HpMenu character={character} />

        <Row justify="space-between" align="middle">
          {/* proficiency bonus */}
          <Flex
            justify="center"
            align="center"
            style={{
              width: '25%',
            }}
          >
            <Seal size="5rem" color="currentColor" />
            <InputNumber
              style={{
                position: 'absolute',
                fontSize: '2rem',
              }}
              inputMode="numeric"
              className="number-field"
              formatter={(value) => `+${value < 10 ? `${value}` : value}`}
              variant="borderless"
              name="bonus"
              onChange={(value) => character.updateOther({ bonus: value })}
              value={character.other().bonus}
            />
          </Flex>
          {/* skills menu button */}
          <Flex
            justify="center"
            align="center"
            style={{
              width: '25%',
            }}
          >
            <Button
              icon={
                <Sparkle size="2rem" color="currentColor" weight="duotone" />
              }
              size="large"
              variant="filled"
              onClick={() => setShowSkills(true)}
            >
              Skills
            </Button>
          </Flex>
          <Flex
            justify="center"
            align="center"
            style={{
              width: '25%',
            }}
          >
            <Button
              icon={
                <TreasureChest
                  size="2rem"
                  color="currentColor"
                  weight="duotone"
                />
              }
              size="large"
              variant="filled"
              onClick={() => setShowItems(true)}
            >
              Items
            </Button>
          </Flex>
        </Row>
        {/* character name and border */}

        <Drawer
          placement="bottom"
          size="large"
          title="Skills"
          open={showSkills}
          styles={{
            body: {
              padding: '0.5rem',
            },
          }}
          onClose={() => setShowSkills(false)}
        >
          <SkillsMenu character={character} />
        </Drawer>
        <Drawer
          placement="bottom"
          size="large"
          title="Items"
          open={showItems}
          styles={{
            body: {
              padding: '0.5rem',
            },
          }}
          onClose={() => setShowItems(false)}
        >
          <ItemsList items={items.data} loading={items.loading} />
          <NewItems ownerID={character.character()._id} />
        </Drawer>
      </Col>
    </>
  );
}
