import { App, ConfigProvider, Layout, Menu, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../utils/theme';
import { ThemeToggle } from './ThemeToggle';

const MenuRoutes = [
  { key: '/', label: 'Home' },
  { key: '/campaigns', label: 'Campaigns' },
  { key: '/characters', label: 'Characters' },
];

const ComponentsTheme = {
  Layout: {
    algorithm: true,
    headerBg: 'rgb(0,0,0)',
    headerColor: 'rgb(167,167,167)',
  },
  Button: {
    algorithm: true,
  },
  Menu: {
    darkItemBg: 'rgb(0,0,0)',
  },
};

const ThemeTokens = {
  colorPrimary: '#4b4b54',
  colorInfo: '#4b4b54',
  borderRadius: 8,
};

function LayoutWrap() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentTheme, updateTheme } = useTheme();

  const handleNavigate = (route: string) => {
    if (location.pathname !== 'route') navigate(route);
  };

  return (
    <ConfigProvider
      theme={{
        token: ThemeTokens,
        components: ComponentsTheme,
        cssVar: true,
        algorithm:
          currentTheme === 'dark'
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <App>
        <Layout className="layout">
          <Header
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <h3>
              <i>OpenRolePlatform</i>
            </h3>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['/']}
              selectedKeys={[location.pathname]}
              items={MenuRoutes}
              onClick={(menuItem) => handleNavigate(menuItem.key)}
              style={{ flex: 1, minWidth: 0 }}
            />
            <ThemeToggle
              currentTheme={currentTheme}
              updateTheme={updateTheme}
            />
          </Header>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: 'var(--ant-color-primary-bg)',
            }}
          >
            <div
              className="content"
              style={{
                background: 'var(--ant-color-bg-base)',
                minHeight: 280,
                padding: 24,
                borderRadius: 12,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </App>
    </ConfigProvider>
  );
}

export default LayoutWrap;
