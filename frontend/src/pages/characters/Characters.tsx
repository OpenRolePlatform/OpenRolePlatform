import { List } from '@phosphor-icons/react';
import { Button, Card, Col, Drawer, Image, Row, Skeleton, Tag } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSetState, useMount } from 'react-use';
import useBreakpoint from 'use-breakpoint';
import { DEFAULT_AVATAR } from '../../assets/Images';
import { useSelectedCharacter } from '../../components/CharacterContext';
import CharactersList from '../../components/CharactersList';
import { BREAKPOINTS } from '../../components/Layout';
import { usePlayer } from '../../components/PlayerContext';
import { Character } from '../../models/CharacterModels';
import { getCharacters } from '../../services/CharacterServices';
import { useDynamicList } from '../../services/useDynamicList';
import { getBackendImage } from '../../utils/images';
import CharacterDetails from './CharacterDetails';
import NewCharacter from './NewCharacter';

export default function Characters() {
  const navigate = useNavigate();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const playerContext = usePlayer();
  const [query, setQuery] = useGetSetState({});

  const characters = useDynamicList<Character>(
    'character',
    getCharacters,
    query(),
  );
  const [selectedCharacter, setSelectedCharacter] = useState<string>();
  const characterContext = useSelectedCharacter();

  useMount(() => {
    if (playerContext.role === 'player')
      setQuery({ owner: playerContext.player?._id });
  });

  return (
    <>
      {breakpoint === 'mobile' ? (
        <CharactersList
          characters={characters.data}
          loading={characters.loading}
          actions={(character) => [
            <Button
              icon={<List size={16} weight="bold" />}
              onClick={() => setSelectedCharacter(character._id)}
            />,
          ]}
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
                  hoverable
                  style={{ height: '100%' }}
                  cover={
                    <Image
                      style={{ borderRadius: '10px 10px 0 0' }}
                      src={getBackendImage(character.image!)}
                      fallback={DEFAULT_AVATAR}
                      preview={false}
                    />
                  }
                  onClick={() => setSelectedCharacter(character._id)}
                >
                  <h3>{character.name}</h3>
                  {characterContext.character()._id === character._id && (
                    <Tag color="success">Your Character</Tag>
                  )}
                </Card>
              )}
            </Col>
          ))}
        </Row>
      )}
      <Drawer
        placement="bottom"
        size="large"
        open={selectedCharacter}
        onClose={() => setSelectedCharacter(undefined)}
        extra={
          characterContext.character()?._id !== selectedCharacter ? (
            playerContext.role !== 'dm' && (
              <Button
                variant="filled"
                onClick={() => {
                  characterContext.selectCharacter(selectedCharacter!);
                }}
              >
                Select character
              </Button>
            )
          ) : (
            <Button
              variant="filled"
              onClick={() => {
                navigate(`/characters/${characterContext.character()?._id}`);
              }}
            >
              Start Playing
            </Button>
          )
        }
      >
        <CharacterDetails id={selectedCharacter!} />
      </Drawer>
      <NewCharacter />
    </>
  );
}
