import { Avatar, Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_AVATAR, MASTER_AVATAR } from '../assets/Images';
import { getBackendImage } from '../utils/images';
import { usePlayer } from './PlayerContext';

function PlayerMenu() {
  const navigate = useNavigate();

  const playerContext = usePlayer();

  const items: MenuProps['items'] = [
    {
      key: 'name',
      label:
        playerContext.role === 'player' ? playerContext.player?.name : 'Master',
      disabled: true,
    },
    { type: 'divider' },
    {
      key: 'toDM',
      label: 'Change to DM',
    },
    {
      key: 'exit',
      label: 'Exit',
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
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

  function getAvatar() {
    if (playerContext.role === 'dm') return MASTER_AVATAR;
    else if (playerContext?.player?.image)
      return getBackendImage(playerContext.player.image);
    return DEFAULT_AVATAR;
  }

  return (
    <>
      {playerContext.role && (
        <Dropdown menu={{ items, onClick }}>
          <Avatar size="large" src={getAvatar()} />
        </Dropdown>
      )}
    </>
  );
}

export default PlayerMenu;
