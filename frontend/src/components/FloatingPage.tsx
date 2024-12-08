import { Button, Drawer, FloatButton } from 'antd';
import { ButtonType, ButtonVariantType } from 'antd/es/button';
import { ReactNode, useState } from 'react';

interface FloatingPageProps {
  title: string;
  extra?: ReactNode;
  icon?: ReactNode;
  label?: string;
  floatingButton?: boolean;
  buttonType?: ButtonType;
  buttonVariant?: ButtonVariantType;
}

export const FloatingPage: React.FC<
  React.PropsWithChildren<FloatingPageProps>
> = (props) => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  return (
    <>
      <Drawer
        placement="bottom"
        size="large"
        title={props.title}
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        extra={props.extra}
      >
        {props.children}
      </Drawer>
      {props.floatingButton ? (
        <FloatButton
          icon={props.icon}
          onClick={() => setShowDrawer(true)}
          style={{ height: 60, width: 160 }}
          description={props.label}
          shape="square"
          type="primary"
        />
      ) : (
        <Button
          icon={props.icon}
          onClick={() => setShowDrawer(true)}
          type={props.buttonType ?? 'default'}
          variant={props.buttonVariant ?? 'outlined'}
        >
          props.label
        </Button>
      )}
    </>
  );
};
