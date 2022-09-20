import { mdiChevronLeft } from '@mdi/js';
import Icon from '@mdi/react';
import { ReactNode, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Heading } from '../typography';
import { logo } from './logo';

const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
  }  100% {
    transform: translateX(0%);
  }
`;

const slideOut = keyframes`
  100% {
    transform: translateX(-100%);
  }
`;

const appear = keyframes`
  100% {
    opacity: 1;
  }
`;

const disappear = keyframes`
  100% {
    opacity: 0;
  }
`;

const expand = keyframes`
  100% {
    transform: scaleX(1);
  }
`;

const Catcher = styled.div`
  position: inherit;
  padding: 0px;
  top: 0;
  width: 100%;
  max-width: 272px;
  min-height: 100%;
  overflow: hidden;
`;

const Container = styled.div<{ open: boolean }>`
  position: absolute;
  top: 0;
  height: 100%;
  width: 270px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: #323232;
  animation: ${(props) => (props.open ? slideIn : slideOut)} 0.1s forwards
    ease-out;
`;

const Backdrop = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  min-height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.32);
  animation: ${(props) => (props.open ? appear : disappear)} 0.1s forwards
    ease-out;
`;

const Button = styled.div`
  max-width: 40px;
  max-height: 40px;
  min-width: 40px;
  min-height: 40px;
  background-color: #323232;
  margin: 50px 22px 17px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 10px #7f7f7f;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  gap: 17px;
  width: 100%;
  margin-left: 22px;
  user-select: none;

  ${Heading} {
    font-size: 18px;
  }
`;

const Link = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  cursor: pointer;
  max-width: calc(270px - 44px);

  h1 {
    margin-top: auto;
  }

  * {
    margin: 0;
    padding: 0;
    text-align: left;
  }

  &:hover {
    &::before {
      position: absolute;
      margin-top: 45px;
      content: '';
      width: calc(270px - 44px);
      height: 3px;
      background-color: #3232323c;
      transform: scaleX(0);
      transform-origin: left center;
      animation: ${expand} 0.2s forwards ease-out;
    }
  }
`;

export interface DrawerMenuItem {
  link: string;
  icon: ReactNode;
  title: string;
  onClick: () => void;
}

export interface DrawerProps {
  items: DrawerMenuItem[];
  onClose: () => void;
}

export const Drawer = ({ onClose, items }: DrawerProps) => {
  const [open, setOpen] = useState(true);

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleItemClick = (fn: DrawerMenuItem['onClick']): void => {
    fn();
    close();
  };

  return (
    <>
      <Backdrop open={open} onClick={close} />
      <Catcher>
        <Container open={open} data-cy="drawer">
          {logo}

          <List>
            {items.map((item) => (
              <Link
                onClick={() => handleItemClick(item.onClick)}
                key={item.link}
                title={item.title}
              >
                {item.icon}

                <Heading>{item.title}</Heading>
              </Link>
            ))}
          </List>

          <Button onClick={close} data-testid="close-button" data-cy="close-menu">
            <Icon path={mdiChevronLeft} size={1.3} color="white" />
          </Button>
        </Container>
      </Catcher>
    </>
  );
};
