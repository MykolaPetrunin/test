import { createElement, FC, PropsWithChildren } from 'react';

export const Typography: FC<
  PropsWithChildren<{
    component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    className?: string;
  }>
> = ({ component = 'span', children }) => {
  return createElement(
    component,
    {
      className: 'text-black',
    },
    children,
  );
};
