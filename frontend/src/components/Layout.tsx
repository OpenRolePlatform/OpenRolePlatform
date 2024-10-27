import { Stack } from '@mui/material';
import { ConfigProvider, Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../utils/theme';
import { ThemeToggle } from './ThemeToggle';

function LayoutWrap() {
  const { currentTheme, updateTheme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === 'dark'
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <ThemeToggle currentTheme={currentTheme} updateTheme={updateTheme} />
      <Layout className="layout">
        <Layout.Content>
          <Stack display="flex" direction="column" sx={{ width: '100%' }}>
            <Outlet />
          </Stack>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
}

export default LayoutWrap;
