import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M172 128l44-44a48 48 0 00-68-68l-44 44-44-44a48 48 0 00-68 68l44 44-44 44a48 48 0 0068 68l44-44 44 44a48 48 0 0068-68z"
      />
    </svg>
  );
}
