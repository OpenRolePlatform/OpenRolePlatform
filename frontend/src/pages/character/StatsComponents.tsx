import {
  Button,
  Col,
  ConfigProvider,
  Flex,
  InputNumber,
  Row,
  Segmented,
  Space,
} from 'antd';
import { ChangeEvent, useState } from 'react';
import { HpBorders, player_img, StatsBackground } from '../../assets/Images';
import { Stat } from '../../models/CharacterModels';
import { CharacterService } from '../../services/useCharacter';
import { getBonusValue } from '../../utils/data';
import { getBackendImage } from '../../utils/images';

const stats_img_style = {
  height: '100%',
  width: '100%',
};

export function StatsColumn(props: {
  character: CharacterService;
  statsList: Array<Stat>;
}) {
  const { character } = props;

  return (
    <>
      <Col style={{ width: '25%', height: '100%' }}>
        {props.statsList.map((stat) => (
          <Flex justify="center" align="middle">
            <img
              src={StatsBackground[stat]}
              style={stats_img_style}
              alt={stat}
            />
            <p className="bonus">{getBonusValue(character.stats()[stat])}</p>
            <InputNumber
              variant="borderless"
              inputMode="numeric"
              name={stat}
              formatter={(value) => `${value < 10 ? ` ${value}` : value}`}
              value={character.stats()[stat]}
              onChange={(value) =>
                character.updateStats({ [stat]: value ?? 0 })
              }
              className="stat-field number-field"
            />
          </Flex>
        ))}
      </Col>
    </>
  );
}

export function AltStats(props: { character: CharacterService }) {
  const { character } = props;

  return (
    <Space.Compact block style={{ padding: '8px 0', justifyContent: 'center' }}>
      {/*  <img src={ais_img[1]} alt="initiative" /> */}
      <InputNumber
        className="number-field"
        style={{
          width: '30%',
          fontSize: '3.5vw',
        }}
        disabled
        variant="borderless"
        value={getBonusValue(character.stats().dexterity)}
      />
      <InputNumber
        className="number-field"
        style={{
          /* position: 'absolute', */
          width: '30%',
          fontSize: '3.5vw',
        }}
        formatter={(value) => `${value > 0 ? `+${value}` : value}`}
        variant="borderless"
        name="ac"
        onChange={(value) => character.updateOther({ ac: value ?? 0 })}
        value={character.other().ac}
      />
      <InputNumber
        className="number-field"
        style={{
          /* position: 'absolute', */
          width: '30%',
          fontSize: '3.5vw',
        }}
        formatter={(value) => `${value > 0 ? `+${value}` : value}`}
        variant="borderless"
        name="movement"
        onChange={(value) => character.updateOther({ movement: value ?? 0 })}
        value={character.other().movement}
      />
    </Space.Compact>
  );
}

export function HpButton(props: {
  amount: number;
  handleHpUpdate: (amount: number) => void;
}) {
  const { amount, handleHpUpdate } = props;

  return (
    <Button
      type="text"
      className="hp-button"
      icon={
        <img
          src={HpBorders.button}
          alt={amount > 0 ? `+${amount}` : String(amount)}
        />
      }
      onClick={() => handleHpUpdate(amount)}
    >
      <span className="hp-button__text">
        {amount > 0 ? `+${amount}` : amount}
      </span>
    </Button>
  );
}

export function HpMenu(props: { character: CharacterService }) {
  const { character } = props;

  const hpOptions = [
    { label: 'HP', value: 'hp' },
    { label: 'Temp', value: 'hpTemp' },
    { label: 'Pool', value: 'hpPool' },
  ];

  const [selectedHp, setSelectedHp] = useState<'hp' | 'hpTemp' | 'hpPool'>(
    'hp',
  );

  const [life_img, setLifeImg] = useState(HpBorders.hp[0]);
  const [life_temp_img, setLifeTempImg] = useState(HpBorders.hpTemp[0]);
  const [life_pool_img, setLifePoolImg] = useState(HpBorders.hpPool[0]);

  function handleHpUpdate(amount: number) {
    character.updateHp({
      [selectedHp]: (character.hp()[selectedHp] ?? 0) + amount,
    });
  }

  function handleChangeHp(value: 'hp' | 'hpTemp' | 'hpPool') {
    setSelectedHp(value);
    switch (value) {
      case 'hp':
        setLifeImg(HpBorders.hp[1]);
        setLifeTempImg(HpBorders.hpTemp[0]);
        setLifePoolImg(HpBorders.hpPool[0]);
        break;
      case 'hpTemp':
        setLifeImg(HpBorders.hp[0]);
        setLifeTempImg(HpBorders.hpTemp[1]);
        setLifePoolImg(HpBorders.hpPool[0]);
        break;
      case 'hpPool':
        setLifeImg(HpBorders.hp[0]);
        setLifeTempImg(HpBorders.hpTemp[0]);
        setLifePoolImg(HpBorders.hpPool[1]);
        break;
    }
  }

  return (
    <>
      <Space direction="vertical" align="center">
        <Segmented
          options={hpOptions}
          onChange={(value) => handleChangeHp(value)}
          value={selectedHp}
        />
        <Row className="hp-menu" align="middle" justify="space-around">
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  controlHeight: '100%',
                },
              },
            }}
          >
            <Space.Compact
              block
              direction="vertical"
              className="hp-menu__button-col"
              size="large"
            >
              <HpButton amount={-5} handleHpUpdate={handleHpUpdate} />
              <HpButton amount={-1} handleHpUpdate={handleHpUpdate} />
              <HpButton amount={-10} handleHpUpdate={handleHpUpdate} />
            </Space.Compact>
            <Flex
              className="hp-menu__mid-col"
              vertical
              align="center"
              justify="space-between"
            >
              <Flex justify="center" align="center">
                <img src={life_img} alt="HP" />
                <InputNumber
                  inputMode="numeric"
                  onFocus={() => handleChangeHp('hp')}
                  controls={false}
                  className="number-field"
                  style={{
                    display: 'table-cell',
                    position: 'absolute',
                    textAlign: 'center',
                    fontSize: '3.5vw',
                  }}
                  variant="borderless"
                  name="hp"
                  value={character.hp().hp}
                  onChange={(value) =>
                    character.updateHp({ hp: value ?? undefined })
                  }
                />
              </Flex>

              <Row justify="space-around" align="middle">
                <Flex justify="center" align="center" style={{ width: '50%' }}>
                  <img src={life_temp_img} alt="Temp HP" />
                  <InputNumber
                    inputMode="numeric"
                    onFocus={() => handleChangeHp('hpTemp')}
                    controls={false}
                    className="number-field"
                    style={{
                      position: 'absolute',
                      fontSize: '3.5vw',
                    }}
                    variant="borderless"
                    name="hpTemp"
                    value={character.hp().hpTemp}
                    onChange={(value) =>
                      character.updateHp({ hpTemp: value ?? undefined })
                    }
                  />
                </Flex>
                {(character.hp().hpPool || selectedHp == 'hpPool') && (
                  <Flex
                    justify="center"
                    align="center"
                    style={{ width: '50%' }}
                  >
                    <img src={life_pool_img} alt="Pool HP" />
                    <InputNumber
                      inputMode="numeric"
                      onFocus={() => handleChangeHp('hpPool')}
                      controls={false}
                      className="number-field"
                      style={{
                        position: 'absolute',
                        fontSize: '3.5vw',
                      }}
                      variant="borderless"
                      name="hpPool"
                      value={character.hp().hpPool}
                      onChange={(value) =>
                        character.updateHp({ hpPool: value ?? undefined })
                      }
                    />
                  </Flex>
                )}
              </Row>
            </Flex>
            <Space.Compact
              size="large"
              block
              direction="vertical"
              className="hp-menu__button-col"
            >
              <HpButton amount={+5} handleHpUpdate={handleHpUpdate} />
              <HpButton amount={+1} handleHpUpdate={handleHpUpdate} />
              <HpButton amount={+10} handleHpUpdate={handleHpUpdate} />
            </Space.Compact>
          </ConfigProvider>
        </Row>
      </Space>
    </>
  );
}

export function GeneralStats(props: {
  character: CharacterService;
  handleUpdate: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const { character } = props;

  return (
    <>
      <Col style={{ width: '50%' }}>
        {/* character image and border */}
        <Flex justify="center" align="middle">
          <img
            src={getBackendImage(character.character().image)}
            style={{ width: '90%', height: '90%', marginTop: '5%' }}
            alt="character"
          />
          <img
            src={player_img[1]}
            style={{
              position: 'absolute',
              width: '100%',
            }}
            alt="character"
          />
        </Flex>

        <AltStats character={character} />
        <HpMenu character={character} />
      </Col>
    </>
  );
}
