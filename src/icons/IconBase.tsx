import React from 'react';

export type ServiceIconProps = React.SVGProps<SVGSVGElement>;

/**
 * Shared 32x32 pure line-art wrapper for the service icons.
 * - No fills, no greys: just clean outlines (+ tiny solid eyes/noses).
 * - Colour comes from CSS `color` (currentColor): `style={{ color }}` works.
 * - Fine default stroke (0.9 on a 32 grid). Need it bolder? strokeWidth={1.1}.
 * - Size comes from className (w-14 h-14) or width/height.
 */
export default function IconBase({
    children,
    strokeWidth = 0.9,
    ...props
}: ServiceIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="1em"
            height="1em"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            {children}
        </svg>
    );
}