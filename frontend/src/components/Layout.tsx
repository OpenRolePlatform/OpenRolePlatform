import { App, ConfigProvider, Layout, Menu, MenuProps, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../utils/theme';
import { usePlayer } from './PlayerContext';
import PlayerMenu from './PlayerMenu';
import { ThemeToggle } from './ThemeToggle';

const ComponentsTheme = {
  Layout: {
    algorithm: true,
    headerBg: 'rgb(0,0,0)',
    headerColor: 'rgb(167,167,167)',
    headerPadding: '0px 24px',
    bodyBG: 'rgb(243,244,245)',
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

export const BREAKPOINTS = { mobile: 0, tablet: 576, desktop: 1280 };

const DmRoutes = [
  { key: '/', label: 'Home' },
  { key: '/campaigns', label: 'Campaigns' },
  { key: '/characters', label: 'Characters' },
];

type MenuItem = Required<MenuProps>['items'][number];

const PlayerRoutes = [{ key: '/characters', label: 'Characters' }];

function LayoutWrap() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentTheme, updateTheme } = useTheme();
  const handleNavigate = (route: string) => {
    if (location.pathname !== 'route') navigate(route);
  };

  const [menuRoutes, setMenuRoutes] = useState<MenuItem[]>([]);

  const playerContext = usePlayer();

  useEffect(() => {
    if (playerContext.role === 'dm') setMenuRoutes(DmRoutes);
    else if (playerContext.role === 'player') setMenuRoutes(PlayerRoutes);
    else setMenuRoutes([]);
  });

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
      <App message={{ top: 5 }}>
        <Layout className="layout">
          <Header
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 500,
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
              items={menuRoutes}
              onClick={(menuItem) => handleNavigate(menuItem.key)}
              style={{ flex: 1, minWidth: 0 }}
            />
            <PlayerMenu />
            <ThemeToggle
              currentTheme={currentTheme}
              updateTheme={updateTheme}
            />
          </Header>
          <Content
            style={{
              padding: 16,
              margin: 0,
              minHeight: 280,
              paddingBottom: 120,
              //maxHeight: '100vh',
            }}
          >
            <div
              className="content"
              style={{
                background: 'var(--ant-color-bg-base)',
                minHeight: 280,
                padding: 8,
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
