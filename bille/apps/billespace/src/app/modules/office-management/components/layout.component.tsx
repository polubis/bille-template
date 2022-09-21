import { ReactNode } from 'react';
import styled from 'styled-components';
import { FooterComponent, FooterComponentProps } from './footer.component';

const Layout = styled.div`
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

interface LayoutComponentProps extends FooterComponentProps {
  children: ReactNode;
}

export const LayoutComponent = ({
  children,
  disabled,
  onSubmit,
}: LayoutComponentProps) => {
  return (
    <>
      <Layout>{children}</Layout>
      <FooterComponent disabled={disabled} onSubmit={onSubmit} />
    </>
  );
};
