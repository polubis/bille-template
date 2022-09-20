import styled, { css } from 'styled-components';
import { LayoutProps } from './models';
import {
  throttleTime,
  animationFrameScheduler,
  filter,
  fromEvent,
  pairwise,
  distinctUntilChanged,
  map,
  of,
  switchMap,
} from 'rxjs';
import { useObservable } from 'rxjs-hooks';

const [HEADER_HEIGHT, FOOTER_HEIGHT] = [82, 64];

type ScrollDirection = 'Up' | 'Down';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  padding: 0 0 ${FOOTER_HEIGHT}px 0;
`;

const Header = styled.header`
  height: ${HEADER_HEIGHT}px;

  & > * {
    height: 100%;
    padding: 0 24px;
  }
`;

const Main = styled.main`
  & > * {
    padding: 24px 24px 42px 24px;
  }
`;

const Footer = styled.footer<{ scrollDirection: ScrollDirection }>`
  height: ${FOOTER_HEIGHT}px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  transition: 200ms;

  ${(props) =>
    props.scrollDirection === 'Down' &&
    css`
      transform: translateY(133%);
      transition: transform, 200ms;
    `};

  & > * {
    height: 100%;
    padding: 0 24px;
  }
`;

export const Center = styled.div`
  height: calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Streched = styled.div`
  max-height: max-content;
  min-height: calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px);
  width: 100%;
  display: flex;
  flex-flow: column;

  & > * {
    width: 100%;
  }
`;

const watchScroll = () =>
  of(typeof window === 'undefined').pipe(
    filter((bool) => !bool),
    switchMap(() => fromEvent(window, 'scroll', { passive: true })),
    throttleTime(0, animationFrameScheduler),
    map(() => window.pageYOffset),
    pairwise(),
    map(([y1, y2]): ScrollDirection => (y2 < y1 ? 'Up' : 'Down')),
    distinctUntilChanged()
  );

export const Layout = ({ children, header, footer }: LayoutProps) => {
  const scrollDirection = useObservable(watchScroll, 'Up');

  return (
    <Container>
      <Header>{header}</Header>
      <Main>{children}</Main>
      <Footer scrollDirection={scrollDirection}>{footer}</Footer>
    </Container>
  );
};
