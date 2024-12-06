import { Avatar } from 'antd';
import { FC } from 'react';
import { MASTER_AVATAR } from '../assets/Images';
import { getBackendImage } from '../utils/images';

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
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

export const PlayerAvatar: FC<{
  name?: string;
  image?: string;
  role: string;
}> = (props) => {
  function getAvatar() {
    if (props.role === 'dm') return MASTER_AVATAR;
    else if (props.image) return getBackendImage(props.image);
    return getInitials(props.name ?? '');
  }

  return (
    <Avatar
      size="large"
      style={{
        backgroundColor:
          props.role === 'player'
            ? generateBackground(props.name ?? '')
            : 'white',
        pointerEvents: 'none',
      }}
      src={getAvatar()}
    >
      {props.role === 'player' && getInitials(props.name ?? '')}
    </Avatar>
  );
};
