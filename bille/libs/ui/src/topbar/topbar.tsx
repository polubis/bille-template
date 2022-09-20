import styled, { css } from 'styled-components';
import { Avatar } from '../avatar';
import { Heading } from '../typography/typography';
import { TopbarProps } from './models';

const Header = styled.header<{ hideAvatar: TopbarProps['hideAvatar'] }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: #fff;
  height: 82px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.14);

  ${(props) =>
    !props.hideAvatar &&
    css`
      & > *:last-child {
        flex-shrink: 0;
        margin-left: 24px;
      }
    `}

  ${Heading} {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Topbar = ({ title, hideAvatar, ...avatarProps }: TopbarProps) => {
  return (
    <Header hideAvatar={hideAvatar}>
      <Heading>{title}</Heading>
      {hideAvatar || <Avatar {...avatarProps} />}
    </Header>
  );
};
