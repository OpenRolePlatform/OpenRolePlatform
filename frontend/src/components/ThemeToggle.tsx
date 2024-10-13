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
      size="small"
      aria-label="button to toggle theme"
    >
      {props.currentTheme === 'dark' ? (
        <WbSunnyRoundedIcon fontSize="small" />
      ) : (
        <ModeNightRoundedIcon fontSize="small" />
      )}
    </Button>
  );
}
