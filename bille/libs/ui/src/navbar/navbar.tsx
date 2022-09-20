import { mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';
import styled from 'styled-components';
import { DrawerMenuItem } from '../drawer';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 64px;
  background: #323232;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
`;

const Button = styled.div`
  height: 64px;
  width: 64px;
  border-radius: 50%;
  border: 4px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -44px;
  background: #323232;
  cursor: pointer;

  svg {
    transition: 0.1s;
  }

  &:hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    transform: scale(1.2);
  }
`;

export interface NavbarProps {
  mainItem: DrawerMenuItem;
  rightItem: DrawerMenuItem;
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick, mainItem, rightItem }: NavbarProps) => {
  return (
    <Container>
      <IconContainer onClick={onMenuClick} title="Menu">
        <Icon path={mdiMenu} size={1.3} color="white" />
      </IconContainer>
      <Button onClick={mainItem.onClick} title={mainItem.title}>
        {mainItem.icon}
      </Button>
      <IconContainer onClick={rightItem.onClick} title={rightItem.title}>
        {rightItem.icon}
      </IconContainer>
    </Container>
  );
};
