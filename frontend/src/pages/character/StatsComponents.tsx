import {
  Button,
  Col,
  ConfigProvider,
  Flex,
  InputNumber,
  Radio,
  Row,
  Typography,
} from 'antd';
import { ChangeEvent, useState } from 'react';
import {
  life_img_border,
  life_mod_img_border,
  player_img,
  StatsBackground,
} from '../../assets/Images';
import { Stat } from '../../models/CharacterModels';
import { CharacterService } from '../../services/useCharacter';
import { getBonusValue } from '../../utils/data';

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
              name={stat}
              formatter={(value) => `${value < 10 ? ` ${value}` : value}`}
              value={character.stats()[stat]}
              onChange={(value) =>
                character.updateStats({ [stat]: value ?? 0 })
              }
              className="stat-field"
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
    <Row style={{ width: '100%', padding: '8px 0' }}>
      {/* initiative */}
      <Flex align="middle" justify="center" style={{ width: '33%' }}>
        {/*  <img src={ais_img[1]} alt="initiative" /> */}
        <Typography
          style={{
            /*  position: 'absolute', */
            alignSelf: 'center',
            fontSize: '3.5vw',
          }}
        >
          {getBonusValue(character.stats().dexterity)}
        </Typography>
      </Flex>

      {/* AC */}
      <Flex align="middle" justify="center" style={{ width: '33%' }}>
        {/*  <img src={ais_img[0]} alt="AC" /> */}
        <InputNumber
          style={{
            /* position: 'absolute', */
            alignSelf: 'center',
            width: 60,
            fontSize: '3.5vw',
          }}
          formatter={(value) => `${value}`}
          variant="borderless"
          name="ac"
          onChange={(value) => character.updateOther({ ac: value ?? 0 })}
          value={character.other().ac}
        />
      </Flex>

      {/* movement */}
      <Flex align="middle" justify="center" style={{ width: '33%' }}>
        {/*  <img src={ais_img[2]} alt="speed" /> */}
        <InputNumber
          style={{
            /* position: 'absolute', */
            alignSelf: 'center',
            width: 60,
            fontSize: '3.5vw',
          }}
          formatter={(value) => `${value}`}
          variant="borderless"
          name="movement"
          onChange={(value) => character.updateOther({ movement: value ?? 0 })}
          value={character.other().movement}
        />
      </Flex>
    </Row>
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

  const [life_img, setLifeImg] = useState(life_img_border[0]);
  const [life_temp_img, setLifeTempImg] = useState(life_img_border[2]);
  const [life_pool_img, setLifePoolImg] = useState(life_img_border[4]);

  function handleHpUpdate(amount: number) {
    character.updateHp({
      [selectedHp]: (character.hp()[selectedHp] ?? 0) + amount,
    });
  }

  function handleChangeHp(value: 'hp' | 'hpTemp' | 'hpPool') {
    setSelectedHp(value);
    switch (value) {
      case 'hp':
        setLifeImg(life_img_border[1]);
        setLifeTempImg(life_img_border[2]);
        setLifePoolImg(life_img_border[4]);
        break;
      case 'hpTemp':
        setLifeImg(life_img_border[0]);
        setLifeTempImg(life_img_border[3]);
        setLifePoolImg(life_img_border[4]);
        break;
      case 'hpPool':
        setLifeImg(life_img_border[0]);
        setLifeTempImg(life_img_border[2]);
        setLifePoolImg(life_img_border[5]);
        break;
    }
  }

  return (
    <>
      <Row align="middle" justify="space-around">
        <ConfigProvider
          direction="rtl"
          theme={{
            components: {
              Button: {
                controlHeight: '100%',
              },
              InputNumber: {
                controlWidth: '100%',
              },
            },
          }}
        >
          <Col style={{ width: '25%' }}>
            {/* -5 */}
            <Button
              size="small"
              type="text"
              icon={<img src={life_mod_img_border[0]} alt="-5" />}
              onClick={() => handleHpUpdate(-5)}
            >
              <p style={{ position: 'absolute', fontSize: '4vw' }}>-5</p>
            </Button>
            {/* -1 */}
            <Button
              type="text"
              icon={<img src={life_mod_img_border[0]} alt="-1" />}
              onClick={() => handleHpUpdate(-1)}
            >
              <p style={{ position: 'absolute', fontSize: '5vw' }}>-1</p>
            </Button>
            {/* -10 */}
            <Button
              type="text"
              icon={<img src={life_mod_img_border[0]} alt="-10" />}
              onClick={() => handleHpUpdate(-10)}
            >
              <p style={{ position: 'absolute', fontSize: '4vw' }}>-10</p>
            </Button>
          </Col>

          <Flex
            vertical
            align="center"
            justify="space-between"
            style={{ width: '33%', height: '100%' }}
          >
            <Radio.Group
              block
              options={hpOptions}
              onChange={(e) => handleChangeHp(e.target.value)}
              defaultValue="hp"
              optionType="button"
              buttonStyle="solid"
            />
            <Flex justify="center" align="center">
              <img src={life_img} alt="life" />
              <InputNumber
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
                <img src={life_temp_img} alt="life_temp" />
                <InputNumber
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
                <Flex justify="center" align="center" style={{ width: '50%' }}>
                  <img src={life_pool_img} alt="life_temp" />
                  <InputNumber
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
          {/* right column movement and plus operations */}
          <Col style={{ width: '25%' }}>
            {/* +5 */}
            <Button
              type="text"
              icon={<img src={life_mod_img_border[0]} alt="+5" />}
              onClick={() => handleHpUpdate(+5)}
            >
              <p style={{ position: 'absolute', fontSize: '4vw' }}>+5</p>
            </Button>
            {/* +1 */}
            <Button
              type="text"
              icon={<img src={life_mod_img_border[0]} alt="+1" />}
              onClick={() => handleHpUpdate(+1)}
            >
              <p style={{ position: 'absolute', fontSize: '5vw' }}>+1</p>
            </Button>
            {/* +10 */}
            <Button
              type="text"
              icon={<img src={life_mod_img_border[0]} alt="+10" />}
              onClick={() => handleHpUpdate(+10)}
            >
              <p style={{ position: 'absolute', fontSize: '4vw' }}>+10</p>
            </Button>
          </Col>
        </ConfigProvider>
      </Row>
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
            src={player_img[0]}
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
