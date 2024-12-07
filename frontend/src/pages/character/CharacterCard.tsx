import {
  Card,
  Col,
  ConfigProvider,
  Divider,
  Image,
  InputNumber,
  Row,
  Statistic,
  Tag,
  ThemeConfig,
  Typography,
} from 'antd';
import { useMemo } from 'react';

import { DEFAULT_AVATAR, StatsBackground } from '../../assets/Images';
import { Stat, StatsList } from '../../models/CharacterModels';
import { CharacterService, useCharacter } from '../../services/useCharacter';
import { getBonusValue, getBonusValueNum } from '../../utils/data';
import { getBackendImage } from '../../utils/images';

export function CharacterCard(props: { id: string }) {
  const character = useCharacter(props.id);

  return (
    <>
      <Card
        hoverable
        style={{ overflow: 'hidden' }}
        size="small"
        styles={{ body: { padding: 0, overflow: 'hidden' } }}
      >
        <Row gutter={16} style={{ width: '100%' }}>
          <Row>
            <Col
              style={{ padding: 0 }}
              xs={{ flex: '30%' }}
              sm={{ flex: '25%' }}
              md={{ flex: '200px' }}
              lg={{ flex: '200px' }}
              xl={{ flex: '200px' }}
              xxl={{ flex: '200px' }}
            >
              <Image
                style={{ borderRadius: '10px' }}
                src={getBackendImage(character.character().image!)}
                fallback={DEFAULT_AVATAR}
              />
            </Col>
            <Col flex={1} style={{ paddingLeft: 16 }}>
              <Row justify="space-between" align="middle">
                <Typography.Title level={4}>{character.name}</Typography.Title>
                <Tag> Level {character.character().level}</Tag>
              </Row>
              <Row gutter={8}>
                <Col span={8}>
                  <Statistic
                    style={{ whiteSpace: 'nowrap' }}
                    suffix={
                      <>
                        <Typography.Title
                          level={5}
                          italic
                          style={{ color: '#cf1322' }}
                          type="secondary"
                        >
                          HP
                        </Typography.Title>
                      </>
                    }
                    value={character.hp().hp}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    style={{ whiteSpace: 'nowrap' }}
                    suffix={
                      <>
                        <Typography.Title
                          level={5}
                          italic
                          style={{ color: '#3f8600' }}
                          type="secondary"
                        >
                          Armour
                        </Typography.Title>
                      </>
                    }
                    value={character.other().ac}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    style={{ whiteSpace: 'nowrap' }}
                    suffix={
                      <>
                        <Typography.Title
                          level={5}
                          italic
                          style={{ color: '#3f8600' }}
                          type="secondary"
                        >
                          Movement
                        </Typography.Title>
                      </>
                    }
                    value={character.other().movement}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Col flex={1}>
            <Row gutter={8} align="middle" wrap>
              {StatsList.map((stat, index) => (
                <>
                  <Col span={8}>
                    <Row align="middle" justify="space-around" wrap={false}>
                      <Statistic
                        style={{ whiteSpace: 'nowrap' }}
                        suffix={
                          <>
                            <Typography.Title level={5} italic type="secondary">
                              {stat.slice(0, 3)}
                            </Typography.Title>
                          </>
                        }
                        value={getBonusValueNum(character.stats()[stat])}
                        prefix={
                          getBonusValueNum(character.stats()[stat]) > 0 && '+'
                        }
                      />
                      {index !== 5 ? (
                        <Divider type="vertical" />
                      ) : (
                        <span style={{ margin: '0 8px' }}></span>
                      )}
                    </Row>
                  </Col>
                </>
              ))}
            </Row>
          </Col>
        </Row>
      </Card>
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
