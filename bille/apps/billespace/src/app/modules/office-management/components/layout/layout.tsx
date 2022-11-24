import { ReactNode } from 'react';
import styled from 'styled-components';
import { Footer, FooterProps } from './footer';

const Content = styled.div`
  display: flex;
  flex-flow: column;

  & > *:first-child {
    margin: 28px 0 12px 0;
  }

  & > *:not(:first-child) {
    margin: 0 0 12px 0;
  }

  & > *:last-child {
    margin-bottom: 28px;
  }

  & + * {
    margin-top: auto;
  }
`;

interface LayoutProps extends FooterProps {
  children: ReactNode;
}

export const Layout = ({ children, disabled, onSubmit }: LayoutProps) => {
  return (
    <>
      <Content>{children}</Content>
      <Footer disabled={disabled} onSubmit={onSubmit} />
    </>
  );
};
