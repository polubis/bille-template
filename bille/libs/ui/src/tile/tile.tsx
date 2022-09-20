import styled from 'styled-components';
import { TileProps } from './models';

export const Tile = styled.div<TileProps>`
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 12px 16px;
  cursor: pointer;
  
  background: ${(props) => (props.active ? '#8FD59A' : '#f6f6f6')};
`;
