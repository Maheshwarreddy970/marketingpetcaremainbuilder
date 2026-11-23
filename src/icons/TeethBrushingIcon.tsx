import React from 'react';
import IconBase, { ServiceIconProps } from './IconBase';

export default function TeethBrushingIcon(props: ServiceIconProps) {
    return (
        <IconBase {...props}>
            <g transform="translate(3.2 -4.3) scale(0.8)" strokeWidth="1.125">
            <path d="M9.8 9.9C11.4 8.5 13.5 7.9 16 7.9s4.6.6 6.2 2c1.1 1 1.8 2.5 1.8 4.2v3.2c0 5.1-3.5 8.9-8 8.9s-8-3.8-8-8.9v-3.2c0-1.7.7-3.2 1.8-4.2z" />
            <path d="M9.8 9.9C6.9 8.2 4.1 10.4 4.5 15c.3 3.2 1.3 5.2 3.6 5.8" />
            <path d="M22.2 9.9c2.9-1.7 5.7.5 5.3 5.1-.3 3.2-1.3 5.2-3.6 5.8" />
            <circle cx="12.2" cy="14.2" r=".95" fill="currentColor" stroke="none" />
            <circle cx="19.8" cy="14.2" r=".95" fill="currentColor" stroke="none" />
            <path d="M14.3 17.2h3.4c.5 0 .7.5.4.9l-1.5 1.8c-.4.4-.8.4-1.2 0l-1.5-1.8c-.3-.4-.1-.9.4-.9z" fill="currentColor" stroke="none" />
            <path d="M16 19.9v1.7" />
            <path d="M12.7 21.6h6.6c0 2.2-1.4 3.7-3.3 3.7s-3.3-1.5-3.3-3.7z" />
            <path d="M14.4 21.6v1.2M16 21.6v1.5M17.6 21.6v1.2" />
            </g>
            <rect x="8.6" y="22.6" width="9" height="4.4" rx="1.5" />
            <path d="M17.6 24.8h9.6a1.2 1.2 0 0 1 0 2.4h-9.6" />
            <path d="M10.2 22.6v-2.2M12.2 22.6v-2.2M14.2 22.6v-2.2M16.2 22.6v-2.2" />
            <path d="M28.2 3.5Q28.50 5.20 30.2 5.5Q28.50 5.80 28.2 7.5Q27.90 5.80 26.2 5.5Q27.90 5.20 28.2 3.5Z" fill="currentColor" stroke="none" />
            <path d="M29.2 10.9Q29.36 11.84 30.3 12Q29.36 12.16 29.2 13.1Q29.04 12.16 28.099999999999998 12Q29.04 11.84 29.2 10.9Z" fill="currentColor" stroke="none" />
        </IconBase>
    );
}