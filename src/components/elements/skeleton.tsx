import { Skeleton as SK, SkeletonItem } from '@fluentui/react-components';
import type { SkeletonProps } from '@fluentui/react-components';

import { useSkeletonStyles } from '@/utils';

export const Skeleton = (props: Partial<SkeletonProps>) => {
  const styles = useSkeletonStyles();
  return (
    <SK className={styles.root} {...props}>
      {new Array(14).fill(0).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </SK>
  );
};
