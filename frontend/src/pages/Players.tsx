import { User } from '@phosphor-icons/react';
import { App, Avatar, Button, Drawer, List, Skeleton } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMount } from 'react-use';
import { DEFAULT_AVATAR } from '../assets/Images';
import { usePlayer } from '../components/PlayerContext';
import { Player } from '../models/PlayerModels';
import { getPlayers } from '../services/PlayerServices';
import { getBackendImage } from '../utils/images';
import NewPlayer from './NewPlayer';

export default function Players() {
  const navigate = useNavigate();

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const { message } = App.useApp();

  const playerContext = usePlayer();

  const [loading, setLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<Array<Player>>([]);

  const loadPlayers = async () => {
    try {
      const data = await getPlayers();
      setPlayers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useMount(async () => {
    await loadPlayers();
  });

  return (
    <>
      <Drawer
        placement="bottom"
        size="large"
        title="Select player"
        open={showDrawer}
        extra={<NewPlayer players={players} refresh={loadPlayers} />}
        onClose={() => setShowDrawer(false)}
      >
        <List
          itemLayout="horizontal"
          size="large"
          dataSource={players}
          renderItem={(player) => (
            <List.Item
              actions={[
                <>
                  <Button onClick={() => playerContext.selectPlayer(player)}>
                    Select Player
                  </Button>
                </>,
              ]}
            >
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
