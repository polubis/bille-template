import { AvatarProps } from "../avatar/models";

export interface TopbarProps extends AvatarProps {
  title: string;
  hideAvatar?: boolean;
}
