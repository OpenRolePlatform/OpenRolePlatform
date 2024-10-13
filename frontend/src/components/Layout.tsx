import { createTheme, Stack, ThemeProvider } from '@mui/material';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../utils/theme';
import getLPTheme from './getLPTheme';
import { ThemeToggle } from './ThemeToggle';

function LayoutWrap() {
  const { currentTheme, updateTheme } = useTheme();
  const LPtheme = createTheme(getLPTheme(currentTheme));

  return (
    <ThemeProvider theme={LPtheme}>
      <Layout>
        <Layout.Header>
          Header
          <ThemeToggle {...{ currentTheme, updateTheme }} />
        </Layout.Header>
        <Layout>
          <Layout.Sider>Sidebar</Layout.Sider>
          <Layout.Content>
            <Stack display="flex" direction="column" sx={{ width: '100%' }}>
              <Outlet />
            </Stack>
          </Layout.Content>
        </Layout>
      </Layout>
    </ThemeProvider>
  );
}

export default LayoutWrap;
