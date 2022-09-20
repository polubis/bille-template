import styled, { css } from 'styled-components';

export const LabelStyle = css`
  font-size: 12px;
  color: #6d6d6d;
  font-family: 'Billennium-Regular', sans-serif;
`;

export const TitleStyle = css`
  font-size: 16px;
  color: #000;
  font-family: 'Billennium-SemiBold', sans-serif;
`;

export const SmallTitleStyle = css`
  font-size: 13px;
  color: #000;
  font-family: 'Billennium-SemiBold', sans-serif;
`;

export const Heading = styled.h1`
  font-size: 20px;
  color: #000;
  font-family: 'Billennium-SemiBold', sans-serif;
`;

export const Title = styled.h2`
  ${TitleStyle}
`;

export const SmallTitle = styled.h3`
  ${SmallTitleStyle}
`;

export const Label = styled.span`
  ${LabelStyle}
  text-transform: uppercase;
`;

export const Description = styled.span`
  ${LabelStyle}
`;
