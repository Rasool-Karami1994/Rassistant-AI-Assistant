const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      stroke="#C9C9DB"
      strokeLinecap="round"
      d="M11 10.333c2.594 0 4.697-2.089 4.697-4.666C15.697 3.089 13.594 1 11 1S6.303 3.09 6.303 5.667 8.406 10.333 11 10.333ZM1.404 17.597C2.262 14.471 5.518 13 8.78 13h4.442c3.261 0 6.517 1.47 7.376 4.597.187.68.32 1.371.396 2.071.08.733-.529 1.332-1.27 1.332H2.277c-.741 0-1.35-.6-1.27-1.33.077-.7.21-1.394.397-2.073Z"
    />
  </svg>
);
export default SvgComponent;
