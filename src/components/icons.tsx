import type { SVGProps } from 'react';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m15.5 8.5-7 7" />
      <path d="M8.5 8.5l7 7" />
      <path d="M12 7.5v-2.5" />
      <path d="M12 19v-2.5" />
      <path d="M16.5 12h-2.5" />
      <path d="M10 12H7.5" />
    </svg>
  ),
};
