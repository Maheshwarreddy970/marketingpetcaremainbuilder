import React from 'react';
import IconBase, { ServiceIconProps } from './IconBase';

export default function MaintenanceCleanIcon(props: ServiceIconProps) {
    return (
        <IconBase {...props}>
            <g transform="translate(0 1) scale(0.75)" strokeWidth="1.200">
            <path d="M8 13.4L7.4 5.2C7.3 4.5 8 4.2 8.5 4.6L13.2 8.2C14.1 7.9 15 7.8 16 7.8S17.9 7.9 18.8 8.2L23.5 4.6C24 4.2 24.7 4.5 24.6 5.2L24 13.4C25 14.8 25.5 16.4 25.5 18C25.5 23 21.5 26.5 16 26.5C10.5 26.5 6.5 23 6.5 18C6.5 16.4 7 14.8 8 13.4Z" />
            <path d="M9.3 10.8l-.3-3.5 2.7 1.9M22.7 10.8l.3-3.5-2.7 1.9" />
            <ellipse cx="12" cy="16.4" rx=".9" ry="1.25" fill="currentColor" stroke="none" />
            <ellipse cx="20" cy="16.4" rx=".9" ry="1.25" fill="currentColor" stroke="none" />
            <path d="M14.9 19.4h2.2l-1.1 1.3z" fill="currentColor" stroke="none" />
            <path d="M16 20.7v1.1M16 21.8c-.7.9-1.7 1.2-2.7.7M16 21.8c.7.9 1.7 1.2 2.7.7" />
            <path d="M5.6 19.4L1.8 18.6M5.7 21.4L2.2 22.6M26.4 19.4l3.8-.8M26.3 21.4l3.5 1.2" />
            </g>
            <g transform="translate(23.6 24.2) rotate(45) scale(1.25)" strokeWidth="0.72">
            <rect x="-3.2" y="-2.3" width="6.4" height="4.6" rx="1.5" />
            <rect x="3.2" y="-1" width="4.8" height="2" rx="1" />
            <circle cx="-1.6" cy="-.8" r=".45" fill="currentColor" stroke="none" /><circle cx="0" cy="-.8" r=".45" fill="currentColor" stroke="none" /><circle cx="1.6" cy="-.8" r=".45" fill="currentColor" stroke="none" />
            <circle cx="-1.6" cy=".8" r=".45" fill="currentColor" stroke="none" /><circle cx="0" cy=".8" r=".45" fill="currentColor" stroke="none" /><circle cx="1.6" cy=".8" r=".45" fill="currentColor" stroke="none" />
            </g>
            <path d="M27 5.7Q27.34 7.66 29.3 8Q27.34 8.35 27 10.3Q26.66 8.35 24.7 8Q26.66 7.66 27 5.7Z" fill="currentColor" stroke="none" />
            <path d="M29 13.8Q29.18 14.82 30.2 15Q29.18 15.18 29 16.2Q28.82 15.18 27.8 15Q28.82 14.82 29 13.8Z" fill="currentColor" stroke="none" />
        </IconBase>
    );
}