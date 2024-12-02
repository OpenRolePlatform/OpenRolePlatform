import { SmileySad } from '@phosphor-icons/react';
import { Avatar, ConfigProvider, List, Skeleton, Space } from 'antd';
import { DEFAULT_AVATAR } from '../assets/Images';
import { Player } from '../models/PlayerModels';
import { getBackendImage } from '../utils/images';

interface PlayersListProps {
  players: Array<Player> | undefined;
  actions?: (player: Player) => React.ReactNode[];
  loading: boolean;
}
const EmptyPlayers = () => {
  return (
    <Space direction="vertical" align="center">
      <SmileySad size={32} />
      <p>No players in the campaign</p>
    </Space>
  );
};
export default function PlayersList({
  players,
  actions,
  loading,
}: PlayersListProps) {
  return (
    <ConfigProvider renderEmpty={EmptyPlayers}>
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={
          players ?? [
            [
              { name: '', image: '' },
              { name: '', image: '' },
              { name: '', image: '' },
            ],
          ]
        }
        renderItem={(player) => (
          <List.Item actions={actions ? actions(player) : []}>
            <Skeleton loading={loading} active avatar>
              <List.Item.Meta
                avatar={
                  <Avatar
                    size="large"
                    src={
                      player.image
                        ? getBackendImage(player.image)
                        : DEFAULT_AVATAR
                    }
                  />
                }
                title={player.name}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </ConfigProvider>
  );
}
