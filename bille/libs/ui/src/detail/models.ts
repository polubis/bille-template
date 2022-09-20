import { ReactNode } from 'react';
import { StyledComponent } from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RenderContent = (component: StyledComponent<'span', any>) => ReactNode;

export type ContentProp = RenderContent | string;

export interface DetailProps {
  label: ContentProp;
  value: ContentProp;
}
