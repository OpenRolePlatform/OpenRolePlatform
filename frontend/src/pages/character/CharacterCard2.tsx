import {
  Card,
  ConfigProvider,
  InputNumber,
  ThemeConfig,
  Typography,
} from 'antd';
import { useMemo } from 'react';

import { player_img, StatsBackground } from '../../assets/Images';
import { Stat } from '../../models/CharacterModels';
import { CharacterService, useCharacter } from '../../services/useCharacter';
import { getBonusValue } from '../../utils/data';

export function CharacterCard(props: { name: string }) {
  const character = useCharacter(props.name);

  return (
    <>
      <Card cover={<img src={character} />} style={{ width: 240 }}></Card>
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
