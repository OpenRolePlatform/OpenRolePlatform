import { Avatar, Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MASTER_AVATAR } from '../assets/Images';
import { getBackendImage } from '../utils/images';
import { usePlayer } from './PlayerContext';

function getInitials(name: string) {
  const spited = name.split(' ');
  let initials = spited[0][0];
  if (spited.length > 1) initials = initials.concat(spited[1][0]);
  return initials;
}

function generateBackground(name: string) {
  let hash = 0;
  let i;

  for (i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  // name.charCodeAt() return an int between 0 and 65535
  // left shift (<<)  operator moves to left by number of specified
  // bites after <<. The whole for loop will create a color hash
  // based on username length
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

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
    return getInitials(playerContext?.player?.name);
  }

  return (
    <>
      {playerContext.role && (
        <Dropdown menu={{ items, onClick }}>
          <Avatar
            size="large"
            style={{
              backgroundColor:
                playerContext.role === 'player'
                  ? generateBackground(playerContext?.player?.name)
                  : 'white',
            }}
            src={getAvatar()}
          >
            {playerContext.role === 'player' &&
              getInitials(playerContext?.player?.name)}
          </Avatar>
        </Dropdown>
      )}
    </>
  );
}

export default PlayerMenu;
