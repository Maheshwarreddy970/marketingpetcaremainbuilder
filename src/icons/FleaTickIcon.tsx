import React from 'react';
import IconBase, { ServiceIconProps } from './IconBase';

export default function FleaTickIcon(props: ServiceIconProps) {
    return (
        <IconBase {...props}>
            <g transform="translate(1.2 1) scale(0.82)" strokeWidth="1.098">
            <path d="M9 14.2L8 5c-.1-.8.8-1.2 1.4-.7l4.6 3.6C14.6 7.7 15.3 7.6 16 7.6s1.4.1 2 .3l4.6-3.6c.6-.5 1.5-.1 1.4.7l-1 9.2c.8 1.2 1.2 2.6 1.2 4.2 0 2.2-.7 4-1.9 5.3-1 1.1-2 1.7-2.6 2.9-.6 1-1.7 1.7-3.1 1.7h-1.2c-1.4 0-2.5-.7-3.1-1.7-.6-1.2-1.6-1.8-2.6-2.9-1.2-1.3-1.9-3.1-1.9-5.3 0-1.6.4-3 1.2-4.2z" />
            <path d="M9.6 10.8l-.5-4 3 2.4M22.4 10.8l.5-4-3 2.4" />
            <circle cx="12.4" cy="15.2" r=".95" fill="currentColor" stroke="none" />
            <circle cx="19.6" cy="15.2" r=".95" fill="currentColor" stroke="none" />
            <path d="M14.4 20.6h3.2c.4 0 .6.4.4.7l-1.4 1.6c-.3.3-.7.3-1 0l-1.4-1.6c-.2-.3 0-.7.2-.7z" fill="currentColor" stroke="none" />
            <path d="M16 22.9v1.2M13.9 25.2c.7.6 1.4.9 2.1.9s1.4-.3 2.1-.9" />
            </g>
            <circle cx="25.4" cy="24.6" r="4.8" />
            <ellipse cx="25.4" cy="25.4" rx="1.3" ry="1.8" />
            <circle cx="25.4" cy="23" r=".8" />
            <path d="M24.8 22.3l-.5-.9M26 22.3l.5-.9" />
            <path d="M24.1 24.6h-1.2M24.1 26h-1.3M26.7 24.6h1.2M26.7 26h1.3" />
            <path d="M22 28l6.8-6.8" />
        </IconBase>
    );
}