import {
  mdiAlertCircleOutline,
  mdiAlertOutline,
  mdiCheckboxMarkedCircleOutline,
  mdiClose,
  mdiInformationOutline,
} from '@mdi/js';
import Icon from '@mdi/react';
import styled, { keyframes } from 'styled-components';
import { SmallTitle } from '../typography';

export interface AlertProps {
  severity: 'error' | 'warning' | 'info' | 'success';
  message: string;
  onClose?: () => void;
}

const THEME = {
  error: {
    backgroundColor: '#FF6C6C',
    fontColor: '#ffffff',
    icon: <Icon path={mdiAlertCircleOutline} size={1} color="#ffffff" />,
  },
  warning: {
    backgroundColor: '#EDEB92',
    fontColor: '#000000',
    icon: <Icon path={mdiAlertOutline} size={1} color="#000000" />,
  },
  info: {
    backgroundColor: '#9AC8EB',
    fontColor: '#000000',
    icon: <Icon path={mdiInformationOutline} size={1} color="#000000" />,
  },
  success: {
    backgroundColor: '#8FD59A',
    fontColor: '#000000',
    icon: (
      <Icon path={mdiCheckboxMarkedCircleOutline} size={1} color="#000000" />
    ),
  },
};

const appear = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.2);
  } 80% {
    opacity: 1;
  } 100% {
    transform: scale(1);
  }
`;

const Container = styled.div<{
  severity: AlertProps['severity'];
}>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  min-height: 60px;
  box-shadow: 0px 4px 6px #0000002f;
  will-change: transform, opacity;
  animation: ${appear} 0.3s forwards;

  ${SmallTitle} {
    line-height: 24px;
    font-size: 14px;
    margin-right: auto;
    color: ${(props) => THEME[props.severity].fontColor};
  }

  background: ${(props) => THEME[props.severity].backgroundColor};
`;

const IconContainer = styled.div`
  cursor: pointer;
`;

export const Alert = ({ severity, message, onClose }: AlertProps) => {
  return (
    <Container severity={severity}>
      <IconContainer>{THEME[severity].icon}</IconContainer>
      <SmallTitle>{message}</SmallTitle>
      {onClose && (
        <IconContainer onClick={onClose} data-testid="close-icon">
          <Icon path={mdiClose} size={1} color={THEME[severity].fontColor} />
        </IconContainer>
      )}
    </Container>
  );
};
