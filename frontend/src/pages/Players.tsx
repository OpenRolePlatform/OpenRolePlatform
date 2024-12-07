import { User } from '@phosphor-icons/react';
import { Button, Drawer } from 'antd';
import { useState } from 'react';
import { usePlayer } from '../components/PlayerContext';
import PlayersList from '../components/PlayersList';
import { Player } from '../models/PlayerModels';
import { getPlayers } from '../services/PlayerServices';
import { useDynamicList } from '../services/useDynamicList';
import NewPlayer from './NewPlayer';

export default function Players() {
  const playerContext = usePlayer();
  const players = useDynamicList<Player>('player', getPlayers);

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  return (
    <>
      <Drawer
        placement="bottom"
        size="large"
        title="Select player"
        open={showDrawer}
        extra={<NewPlayer players={players.data} />}
        onClose={() => setShowDrawer(false)}
      >
        <PlayersList
          players={players.data}
          actions={(player) => [
            <>
              <Button onClick={() => playerContext.selectPlayer(player)}>
                Select Player
              </Button>
            </>,
          ]}
          loading={players.loading}
        />
      </Drawer>
      <Button
        icon={<User />}
        onClick={() => setShowDrawer(true)}
        shape="round"
        size="large"
        block
        type="text"
        variant="filled"
      >
        Enter as Player
      </Button>
    </>
  );
}
