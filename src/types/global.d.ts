import { PropsWithChildren } from 'react';

export {};

declare global {
  type GID = string | null;
  interface GCommonComponentProperties {
    className?: string;
    style?: CSSProperties;
  }

  type GCommonComponentPropertiesWithChildren =
    PropsWithChildren<GCommonComponentProperties>;

  type GVoidFunction = () => void;
}
