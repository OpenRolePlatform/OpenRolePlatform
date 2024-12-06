import { Avatar, Card, Col, List, Row, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetSetState, useMount } from 'react-use';
import useBreakpoint from 'use-breakpoint';
import { DEFAULT_AVATAR } from '../../assets/Images';
import { BREAKPOINTS } from '../../components/Layout';
import { usePlayer } from '../../components/PlayerContext';
import { Character } from '../../models/CharacterModels';
import { getCharacters } from '../../services/CharacterServices';
import { useDynamicList } from '../../services/useDynamicList';
import { getBackendImage } from '../../utils/images';
import NewCharacter from './NewCharacter';

export default function Characters() {
  const navigate = useNavigate();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const playerContext = usePlayer();
  const [query, setQuery] = useGetSetState({});

  const characters = useDynamicList<Character>(
    'character',
    query(),
    getCharacters,
  );

  useMount(() => {
    if (playerContext.role === 'player')
      setQuery({ owner: playerContext.player?._id });
  });

  return (
    <>
      {breakpoint === 'mobile' ? (
        <List
          itemLayout="horizontal"
          size="large"
          dataSource={characters.data}
          renderItem={(character) => (
            <List.Item onClick={() => navigate(`/characters/${character._id}`)}>
              <Skeleton loading={characters.loading} active avatar>
                <List.Item.Meta
                  avatar={
                    character.image ? (
                      <Avatar
                        size="large"
                        src={getBackendImage(character.image)}
                      />
                    ) : (
                      <Avatar size="large" src={DEFAULT_AVATAR} />
                    )
                  }
                  title={character.name}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      ) : (
        <Row align="middle" gutter={[12, 12]}>
          {characters.data.map((character, index) => (
            <Col
              key={`col-${index}`}
              xs={{ flex: '100%' }}
              sm={{ flex: '50%' }}
              md={{ flex: '33%' }}
              lg={{ flex: '20%' }}
              xl={{ flex: '20%' }}
            >
              {characters.loading ? (
                <Card
                  style={{ height: '100%' }}
                  cover={<Skeleton.Node style={{ width: '100%' }} active />}
                >
                  <Skeleton.Input style={{ width: '100%' }} active />
                </Card>
              ) : (
                <Card
                  cover={
                    character.image ? (
                      <img src={getBackendImage(character.image)} />
                    ) : (
                      <img src={DEFAULT_AVATAR} />
                    )
                  }
                  onClick={() => navigate(`/characters/${character._id}`)}
                >
                  <h3>{character.name}</h3>
                </Card>
              )}
            </Col>
          ))}
        </Row>
      )}
      <NewCharacter />
    </>
  );
}
