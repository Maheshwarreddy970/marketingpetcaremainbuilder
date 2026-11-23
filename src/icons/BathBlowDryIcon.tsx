import React from 'react';
import IconBase, { ServiceIconProps } from './IconBase';

export default function BathBlowDryIcon(props: ServiceIconProps) {
    return (
        <IconBase {...props}>
            <defs><clipPath id="svcBathClip"><rect x="0" y="0" width="32" height="17.6" /></clipPath></defs>
            <g clipPath="url(#svcBathClip)">
            <g transform="translate(2.24 -3.3) scale(0.86)" strokeWidth="1.047">
            <path d="M9.8 9.9C11.4 8.5 13.5 7.9 16 7.9s4.6.6 6.2 2c1.1 1 1.8 2.5 1.8 4.2v3.2c0 5.1-3.5 8.9-8 8.9s-8-3.8-8-8.9v-3.2c0-1.7.7-3.2 1.8-4.2z" />
            <path d="M9.8 9.9C6.9 8.2 4.1 10.4 4.5 15c.3 3.2 1.3 5.2 3.6 5.8" />
            <path d="M22.2 9.9c2.9-1.7 5.7.5 5.3 5.1-.3 3.2-1.3 5.2-3.6 5.8" />
            <circle cx="12.2" cy="14.2" r=".95" fill="currentColor" stroke="none" />
            <circle cx="19.8" cy="14.2" r=".95" fill="currentColor" stroke="none" />
            <path d="M14.3 17.2h3.4c.5 0 .7.5.4.9l-1.5 1.8c-.4.4-.8.4-1.2 0l-1.5-1.8c-.3-.4-.1-.9.4-.9z" fill="currentColor" stroke="none" />
            <path d="M16 19.9v1.1M13.6 22c.8.8 1.6 1.2 2.4 1.2s1.6-.4 2.4-1.2" />
            </g>
            </g>
            <path d="M2 17.6h28" />
            <path d="M3.4 17.6v3.4c0 4.2 3.4 7.6 7.6 7.6h10c4.2 0 7.6-3.4 7.6-7.6v-3.4" />
            <path d="M9 28.6l-1 2M23 28.6l1 2" />
            <path d="M6.6 22c1.2-.9 2.4-.9 3.6 0s2.4.9 3.6 0 2.4-.9 3.6 0 2.4.9 3.6 0 2.4-.9 3.6 0" />
            <circle cx="3.4" cy="9.8" r="1.8" />
            <circle cx="5.4" cy="4.6" r="1.1" />
            <circle cx="28.6" cy="9.8" r="1.8" />
            <circle cx="26.6" cy="4.6" r="1.1" />
            <circle cx="29.4" cy="14.2" r=".8" />
            <circle cx="2.6" cy="14.4" r=".8" />
        </IconBase>
    );
}