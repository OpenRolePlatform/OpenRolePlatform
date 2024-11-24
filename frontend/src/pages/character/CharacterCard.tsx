import {
  ConfigProvider,
  Flex,
  InputNumber,
  Row,
  ThemeConfig,
  Typography,
} from 'antd';
import { useMemo } from 'react';

import { DEFAULT_AVATAR, StatsBackground } from '../../assets/Images';
import { Stat } from '../../models/CharacterModels';
import { CharacterService, useCharacter } from '../../services/useCharacter';
import { getBonusValue } from '../../utils/data';

export function CharacterCard(props: { name: string }) {
  const character = useCharacter(props.name);

  return (
    <>
      <Row justify="space-between">
        <Flex vertical align="center">
          <StatField stat={'strength'} character={character} />
          <StatField stat={'dexterity'} character={character} />
          <StatField stat={'constitution'} character={character} />
        </Flex>
        <Flex vertical style={{ position: 'relative', width: '50%' }}>
          <img src={DEFAULT_AVATAR} />
        </Flex>
        <Flex vertical align="center">
          <StatField stat={'intelligence'} character={character} />
          <StatField stat={'wisdom'} character={character} />
          <StatField stat={'charisma'} character={character} />
        </Flex>
      </Row>
    </>
  );
}

export const StatsComponent: ThemeConfig = {
  components: {
    InputNumber: {
      controlWidth: 60,
      fontSize: 22,
    },
  },
};

export function StatField(props: { character: CharacterService; stat: Stat }) {
  const { character, stat } = props;

  const bonus = useMemo(
    () => getBonusValue(character.stats()[stat]),
    [character, stat],
  );

  return (
    <>
      <ConfigProvider theme={StatsComponent}>
        <div
          style={{
            backgroundImage: `url(${StatsBackground[stat]})`,
            width: '12vw',
            height: '14vw',
            backgroundSize: 'cover',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Typography style={{ position: 'relative' }}>{bonus}</Typography>
          <InputNumber
            variant="borderless"
            name={stat}
            value={character.stats()[stat]}
            onChange={(value) => character.updateStats({ [stat]: value })}
            style={{ position: 'absolute', bottom: 0 }}
          />
        </div>
      </ConfigProvider>
    </>
  );
}
