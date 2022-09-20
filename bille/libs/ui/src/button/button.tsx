import styled, { css } from 'styled-components';
import { SmallTitleStyle } from '../typography/typography';
import { ButtonProps } from './models';

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  ${SmallTitleStyle}
  border: 2px solid;
  transition: all 0.05s;

  ${(props) =>
    props.motive === 'orange' &&
    css`
      color: #ffffff;
      background-color: #ff5a00;
      border-color: #ff5a00;
    `}

  ${(props) =>
    props.motive === 'gray' &&
    css`
      color: #ffffff;
      background-color: #323232;
      border-color: #323232;
    `}
      
      ${(props) =>
    props.motive === 'outlinedGray' &&
    css`
      color: #000000;
      background-color: #ffffff;
      border-color: #000000;
    `}
      
      ${(props) =>
    props.disabled &&
    css`
      color: #fff;
      background-color: #ebebeb;
      border-color: #ebebeb;
    `}
        
      ${(props) =>
    props.shape === 'rect' &&
    css`
      line-height: 24px;
      border-radius: 4px;
      padding: 8px 14px;
    `}
    
    ${(props) =>
    props.shape === 'rounded' &&
    css`
      height: 46px;
      width: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      padding: 9px;
    `}
`;
