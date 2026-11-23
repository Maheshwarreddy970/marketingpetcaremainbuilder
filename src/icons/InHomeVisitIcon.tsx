import React from 'react';
import IconBase, { ServiceIconProps } from './IconBase';

export default function InHomeVisitIcon(props: ServiceIconProps) {
    return (
        <IconBase {...props}>
            <path d="M3.4 15.4L16 4.6l12.6 10.8" />
            <path d="M6.2 13.4v15h19.6v-15" />
            <path d="M22.4 8.4V5.4H25v6" />
            <path d="M2.6 28.4h26.8" />
            <path d="M11 28.4V23a5 5 0 0 1 10 0v5.4" />
            <ellipse cx="16" cy="24.8" rx="2.5" ry="2.3" />
            <path d="M14.1 23.4c-1.3-.5-2 .5-1.9 1.8.1.8.5 1.3 1.1 1.4M17.9 23.4c1.3-.5 2 .5 1.9 1.8-.1.8-.5 1.3-1.1 1.4" />
            <circle cx="15.1" cy="24.4" r=".5" fill="currentColor" stroke="none" />
            <circle cx="16.9" cy="24.4" r=".5" fill="currentColor" stroke="none" />
            <circle cx="16" cy="25.7" r=".6" fill="currentColor" stroke="none" />
            <path d="M27.5 6.499999999999999Q27.75 7.94 29.2 8.2Q27.75 8.46 27.5 9.899999999999999Q27.25 8.46 25.8 8.2Q27.25 7.94 27.5 6.499999999999999Z" fill="currentColor" stroke="none" />
        </IconBase>
    );
}