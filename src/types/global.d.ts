import { PropsWithChildren } from 'react';

export {};

declare global {
  type GID = string | number;
  interface GCommonComponentProperties {
    className?: string;
    style?: CSSProperties;
  }

  type GCommonComponentPropertiesWithChildren =
    PropsWithChildren<GCommonComponentProperties>;

  type GVoidFunction = () => void;
}
