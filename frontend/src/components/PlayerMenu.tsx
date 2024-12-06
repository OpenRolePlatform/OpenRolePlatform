import { Button, Drawer, Dropdown, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerDetails from '../pages/player/PlayerDetails';
import { PlayerAvatar } from './PlayerAvatar';
import { usePlayer } from './PlayerContext';

function PlayerMenu() {
  const navigate = useNavigate();

  const playerContext = usePlayer();

  const [items, setItems] = useState<MenuProps['items']>([]);

  const [openDetails, setOpenDetails] = useState<boolean>(false);

  useEffect(() => {
    if (playerContext.role === 'player') {
      setItems([
        {
          key: 'name',
          label: playerContext.player?.name,
          disabled: true,
        },
        { type: 'divider' },
        {
          key: 'profile',
          label: 'Profile',
        },
        {
          key: 'toDM',
          label: 'Change to DM',
        },
        {
          key: 'exit',
          label: 'Exit',
        },
      ]);
    } else
      setItems([
        {
          key: 'name',
          label: 'Master',
          disabled: true,
        },
        { type: 'divider' },
        {
          key: 'exit',
          label: 'Exit',
        },
      ]);
  }, [playerContext.role, playerContext.player]);

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'profile':
        setOpenDetails(true);
        break;
      case 'exit':
        playerContext.logout();
        navigate('/');
        break;
      case 'toDM':
        playerContext.selectDM();
        break;
      default:
        break;
    }
  };

  return (
    <>
      {playerContext.role && (
        <>
          <Dropdown menu={{ items, onClick }}>
            <div>
              <PlayerAvatar
                name={playerContext?.player?.name}
                image={playerContext?.player?.image}
                role={playerContext.role}
              />
            </div>
          </Dropdown>
          <Drawer
            placement="bottom"
            size="large"
            open={openDetails}
            onClose={() => setOpenDetails(false)}
            extra={
              <Button variant="filled" onClick={() => {}}>
                Edit Player
              </Button>
            }
          >
            <PlayerDetails id={playerContext.player?._id} />
          </Drawer>
        </>
      )}
    </>
  );
}

export default PlayerMenu;
