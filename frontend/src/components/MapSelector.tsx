import { Button, Drawer, List, Space } from 'antd';
import { useState } from 'react';
import { MapType } from '../models/MapModels';

interface Map {
  _id: string;
  name: string;
  description?: string;
}

interface MapSelectorProps {
  maps: MapType[];
  onSelectMap: (map: MapType) => void;
  onCreateNew?: () => void;
}


export default function MapSelector({ maps, onSelectMap, onCreateNew }: MapSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Select Map
      </Button>

      <Drawer
        title="Select or create a map"
        placement="bottom"
        open={open}
        onClose={() => setOpen(false)}
        size="large"
      >
        <List
          dataSource={maps}
          renderItem={(map) => (
            <List.Item
              actions={[
                <Button key="select" onClick={() => onSelectMap(map)}>
                  Open
                </Button>,
              ]}
            >
              {map.name}
            </List.Item>
          )}
        />
        <Space style={{ marginTop: 16 }}>
          <Button type="dashed" onClick={onCreateNew}>
            Create New Map
          </Button>
        </Space>
      </Drawer>
    </>
  );
}
