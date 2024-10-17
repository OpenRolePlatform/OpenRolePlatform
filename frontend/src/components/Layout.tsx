import { ConfigProvider, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../utils/theme';

function LayoutWrap() {
  const { currentTheme, updateTheme } = useTheme();

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <Outlet />
      {/* <Layout className="layout">
        <Layout.Header>
          Header
          <ThemeToggle {...{ currentTheme, updateTheme }} />
        </Layout.Header>
        <Layout>
          <Layout.Sider collapsible>Sidebar</Layout.Sider>
          <Layout.Content>
            <Stack display="flex" direction="column" sx={{ width: '100%' }}>
            </Stack>
          </Layout.Content>
        </Layout>
      </Layout> */}
    </ConfigProvider>
  );
}

export default LayoutWrap;
