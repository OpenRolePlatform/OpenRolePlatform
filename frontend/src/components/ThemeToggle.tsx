import { Moon, SunDim } from '@phosphor-icons/react';
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
        <SunDim size={32} />
      ) : (
        <Moon size={32} />
      )}
    </Button>
  );
}
