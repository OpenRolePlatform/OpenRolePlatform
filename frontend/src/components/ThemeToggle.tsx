import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import { Button } from 'antd';
import { ThemeHook } from '../utils/theme';

export function ThemeToggle(props: ThemeHook) {
  return (
    <Button
      onClick={() =>
        props.updateTheme(props.currentTheme === 'light' ? 'dark' : 'light')
      }
      shape="circle"
      size="large"
      type="default"
      variant={'solid'}
      color="default"
      aria-label="button to toggle theme"
      className={props.currentTheme === 'dark' ? 'light-theme-icon' : ''}
    >
      {props.currentTheme === 'dark' ? (
        <WbSunnyRoundedIcon />
      ) : (
        <ModeNightRoundedIcon />
      )}
    </Button>
  );
}
