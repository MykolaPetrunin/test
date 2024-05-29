import { createElement, FC, PropsWithChildren } from 'react';

export const Typography: FC<
    PropsWithChildren<{
        component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
        className?: string;
    }>
> = ({ component = 'span', children, className }) => {
    return createElement(
        component,
        {
            ...(className ? { className } : {})
        },
        children
    );
};
