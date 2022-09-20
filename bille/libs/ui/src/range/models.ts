export interface RangeProps {
  title: string;
  min?: number;
  max?: number;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
