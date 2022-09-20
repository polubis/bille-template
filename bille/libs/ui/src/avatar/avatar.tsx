import styled, { css, keyframes } from 'styled-components';
import { AvatarProps } from './models';

const getFigureSize = (size: AvatarProps['size']) => {
  if (size === 'small') {
    return css`
      height: 40px;
      width: 40px;
    `;
  }

  throw new Error(`getFigureSize() -> Unsupported size: ${size}`);
};

const getShapeSize = (size: AvatarProps['size']) => {
  if (size === 'small') {
    return css`
      height: 33px;
      width: 33px;
    `;
  }

  throw new Error(`getShapeSize() -> Unsupported size: ${size}`);
};

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 1;
`;

const Figure = styled.figure<{
  size: AvatarProps['size'];
  shadow: AvatarProps['shadow'];
}>`
  ${(props) => getFigureSize(props.size)}
  display: flex;
  position: relative;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0;

  ${(props) =>
    props.shadow &&
    css`
      ${Img} {
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      }
    `}
`;

const Letter = styled.div<{ shadow: AvatarProps['shadow'] }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  color: #000000;
  background: #f6f6f6;
  z-index: 1;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.shadow &&
    css`
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    `}
`;

const Rotating = keyframes`
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Shape = styled.div`
  position: absolute;
  background: #ff5a00;
  border-radius: 50%;
`;

const Shapes = styled.div<{
  size: AvatarProps['size'];
  rotating: AvatarProps['rotating'];
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  ${(props) =>
    props.rotating &&
    css`
      animation: ${Rotating} 2s cubic-bezier(1, 0.2, 0.4, 0.85) infinite;
      will-change: transform;
    `}

  ${Shape} {
    ${(props) => getShapeSize(props.size)}

    &:first-of-type {
      top: 0;
      bottom: 0;
      left: -6px;
    }

    &:nth-of-type(2) {
      top: -2px;
      right: -4.5px;
    }

    &:last-of-type {
      bottom: -6.5px;
      right: -1px;
    }
  }
`;

export const Avatar = ({
  src,
  text,
  letter,
  shapes,
  shadow,
  size = 'small',
  rotating,
}: AvatarProps) => {
  return (
    <Figure size={size} shadow={shadow} title={text}>
      {shapes && (
        <Shapes size={size} rotating={rotating}>
          <Shape />
          <Shape />
          <Shape />
        </Shapes>
      )}

      {letter ? (
        <Letter shadow={shadow}>{letter}</Letter>
      ) : (
        <Img src={src} alt={text} />
      )}
    </Figure>
  );
};
