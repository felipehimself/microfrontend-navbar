import { Avatar as AVT } from '@fluentui/react-components';
import type { AvatarProps } from '@fluentui/react-components';

export const Avatar = (props: Partial<AvatarProps>) => (
  <AVT aria-label="Guest" {...props} />
);
