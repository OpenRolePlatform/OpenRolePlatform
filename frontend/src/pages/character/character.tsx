//react imports
import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Character.scss';

//components imports
import { Button, ConfigProvider, Drawer, Flex, InputNumber, Row } from 'antd';
import { ais_img, NameBorder, SkillsImg } from '../../assets/Images.ts';
import SkillsMenu from './SkillsMenu.tsx';
import { GeneralStats, StatsColumn } from './StatsComponents.tsx';

import { Stat } from '../../models/CharacterModels.ts';
import { useCharacter } from '../../services/useCharacter.ts';

const STATS_LEFT: Array<Stat> = ['strength', 'dexterity', 'constitution'];
const STATS_RIGHT: Array<Stat> = ['intelligence', 'wisdom', 'charisma'];

export default function Character() {
  const { characterID } = useParams();

  const character = useCharacter(characterID ?? 'default');
  const [showSkills, setShowSkills] = useState(false);
  //const [showSkills, setShowSkills] = useState(false);

  function handleUpdate(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    if (Object.keys(character.stats()).includes(name)) {
      character.updateStats({
        [name]: value,
      });
    } else if (Object.keys(character.skills()).includes(name)) {
      character.updateSkills({
        [name]: value,
      });
    } else if (Object.keys(character.other()).includes(name)) {
      character.updateOther({
        [name]: value,
      });
    } else if (Object.keys(character.hp()).includes(name)) {
      character.updateHp({
        [name]: value,
      });
    }
  }

  return (
    <>
      {/* general row */}
      <Row>
        {/* left stats column */}
        <StatsColumn character={character} statsList={STATS_LEFT} />
        {/* center column */}
        <GeneralStats character={character} handleUpdate={handleUpdate} />
        {/* right stats column */}
        <StatsColumn character={character} statsList={STATS_RIGHT} />
      </Row>

      <Row justify="space-between" align="middle">
        {/* proficiency bonus */}
        <Flex
          justify="center"
          align="center"
          style={{
            width: '25%',
          }}
        >
          <img src={ais_img[3]} width="50%" alt="proficiency bonus" />
          <InputNumber
            style={{
              position: 'absolute',

              //width: 70,
              fontSize: '3.5vw',
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
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  controlHeightLG: '100%',
                },
              },
            }}
          >
            <Button
              icon={<img src={SkillsImg[0]} height="100%" alt="skills_menu" />}
              size="large"
              type="text"
              onClick={() => setShowSkills(true)}
            />
          </ConfigProvider>
        </Flex>
      </Row>

      {/* character name and border */}
      <Flex justify="center" align="center">
        <h1 style={{ position: 'absolute' }}>{character.name}</h1>
        <img
          src={NameBorder.light}
          style={{ width: '100%', paddingTop: 12 }}
          alt="name"
        />
      </Flex>
      <Drawer
        placement="bottom"
        size="large"
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
    </>
  );
}
