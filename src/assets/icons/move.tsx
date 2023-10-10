import React from 'react';

export const MoveIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} version="1.1" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <g
            transform="scale(1.6667)"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
        >
            <path d="m9 3.748 3-3 3 3" />
            <path d="m15 20.248-3 3-3-3" />
            <path d="m12 0.748v22.5" />
            <path d="m3.75 14.998-3-3 3-3" />
            <path d="m20.25 8.998 3 3-3 3" />
            <path d="m0.75 11.998h22.5" />
        </g>
    </svg>
);
