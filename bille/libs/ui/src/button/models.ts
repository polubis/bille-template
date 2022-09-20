export interface ButtonProps {
  motive: 'orange' | 'gray' | 'outlinedGray';
  shape: 'rect' | 'rounded';
  children: React.ReactNode;
  disabled?: boolean;
}
