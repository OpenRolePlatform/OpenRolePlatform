import { SmileySad } from '@phosphor-icons/react';
import { ConfigProvider, List, Skeleton, Space } from 'antd';
import { Character } from '../models/CharacterModels';
import { PlayerAvatar } from './PlayerAvatar';

interface CharactersListProps {
  characters: Array<Character> | undefined;
  actions?: (character: Character) => React.ReactNode[];
  loading: boolean;
}
const EmptyCharacters = () => {
  return (
    <Space direction="vertical" align="center">
      <SmileySad size={32} />
      <p>No characters in the campaign</p>
    </Space>
  );
};
export default function CharactersList({
  characters,
  actions,
  loading,
}: CharactersListProps) {
  return (
    <ConfigProvider renderEmpty={EmptyCharacters}>
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={
          characters ?? [
            [
              { name: '', image: '' },
              { name: '', image: '' },
              { name: '', image: '' },
            ],
          ]
        }
        renderItem={(character) => (
          <List.Item actions={actions ? actions(character) : []}>
            <Skeleton loading={loading} active avatar>
              <List.Item.Meta
                avatar={
                  <PlayerAvatar
                    name={character.name}
                    image={character.image}
                    role="player"
                  />
                }
                title={character.name}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </ConfigProvider>
  );
}
