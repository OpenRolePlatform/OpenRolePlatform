import {
  Col,
  Descriptions,
  Flex,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
} from 'antd';
import SkeletonAvatar from 'antd/es/skeleton/Avatar';
import { useEffect } from 'react';
import { useSelectedCharacter } from '../../components/CharacterContext';
import { PlayerAvatar } from '../../components/PlayerAvatar';
import { Character } from '../../models/CharacterModels';
import { getCharacterDetails } from '../../services/CharacterServices';
import { useDynamicObject } from '../../services/useDynamicObject';

export default function CharacterDetails({ id }: { id: string }) {
  const characterContext = useSelectedCharacter();

  const character = useDynamicObject<Character>(
    id,
    'character',
    getCharacterDetails,
  );

  useEffect(() => {
    character.refetch();
  }, [id]);

  return (
    <>
      {!character.loading ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Flex gap={'1rem'}>
            <Space
              direction="vertical"
              align="start"
              style={{ height: '100%' }}
            >
              <PlayerAvatar
                role="player"
                image={character.data().image}
                name={character.data().name}
              />
            </Space>
            <Col>
              <Row align="middle" gutter={8}>
                <Col>
                  <Typography.Title level={4}>
                    <b>{character.data().name}</b>
                  </Typography.Title>
                </Col>
                <Col>
                  {characterContext?.character()?._id === id && (
                    <Tag color="success">It's your character!</Tag>
                  )}
                </Col>
              </Row>
              {character.data().description}
            </Col>
          </Flex>
          <Descriptions
            bordered
            items={[
              {
                key: 'creation_date',
                label: 'Creation date',
                children: new Date(
                  character.data().creation_date!,
                ).toDateString(),
              },
              {
                key: 'race',
                label: 'Race',
                children: character.data().race?.toUpperCase(),
              },
              {
                key: 'class',
                label: 'Class',
                children: character.data().class?.toUpperCase(),
              },
            ]}
          />
          <br />
        </Space>
      ) : (
        <>
          <Flex gap={'1rem'}>
            <Space direction="vertical" align="start">
              <SkeletonAvatar size={128}></SkeletonAvatar>
            </Space>
            <Skeleton title loading paragraph={{ rows: 4 }} />
          </Flex>
        </>
      )}
    </>
  );
}
