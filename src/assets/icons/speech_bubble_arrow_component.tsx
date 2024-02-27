import React from 'react';

export const SpeechBubbleArrow: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        className={className}
        width="34px"
        height="16px"
        viewBox="0 -1 34 17"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="Page-1">
            <path
                style={{ filter: 'drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.3))' }}
                fill="currentColor"
                d="M24.9,10.8l-5.1-9.2c-0.3-0.5-0.7-0.9-1.2-1.2c-1.4-0.8-3.3-0.3-4.1,1.2l-5.1,9.2c-1.8,3.2-5.1,5.1-8.7,5.1
		v2.9h32.9v-2.9C30,15.9,26.6,13.9,24.9,10.8z"
            />
        </g>
    </svg>
);
