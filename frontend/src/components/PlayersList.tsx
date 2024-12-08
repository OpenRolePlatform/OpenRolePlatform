import { List as ListIcon, SmileySad } from '@phosphor-icons/react';
import { Button, ConfigProvider, Drawer, List, Skeleton, Space } from 'antd';
import { useState } from 'react';
import { Player } from '../models/PlayerModels';
import PlayerDetails from '../pages/player/PlayerDetails';
import { PlayerAvatar } from './PlayerAvatar';
import { usePlayer } from './PlayerContext';

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
  const [selectedPlyer, setSelectedPlayer] = useState<string>();
  const playerContext = usePlayer();

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
          <List.Item
            actions={
              actions
                ? [
                    ...actions(player),
                    <>
                      <Button
                        icon={<ListIcon size={16} weight="bold" />}
                        onClick={() => setSelectedPlayer(player._id)}
                      />
                    </>,
                  ]
                : []
            }
          >
            <Skeleton loading={loading} active avatar>
              <List.Item.Meta
                avatar={
                  <PlayerAvatar
                    name={player.name}
                    image={player.image}
                    role="player"
                  />
                }
                title={player.name}
              />
            </Skeleton>
          </List.Item>
        )}
      />
      <Drawer
        placement="bottom"
        size="large"
        open={selectedPlyer}
        onClose={() => setSelectedPlayer(undefined)}
        extra={
          playerContext.player?._id === selectedPlyer && (
            <Button variant="filled" onClick={() => {}}>
              Edit Player
            </Button>
          )
        }
      >
        <PlayerDetails id={selectedPlyer!} />
      </Drawer>
    </ConfigProvider>
  );
}
