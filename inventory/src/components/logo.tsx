export default function Logo({
  height,
  width,
}: {
  height: number;
  width: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 586 586"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M293 292.26V439.89L146.87 586V584.52H0.73999V438.39L146.87 292.26H293Z"
        fill="currentColor"
      />
      <path
        d="M293 0V146.13L146.87 292.26H0.73999V147.63L148.37 0H293Z"
        fill="currentColor"
      />
      <path
        d="M585.26 292.26V439.89L439.13 586V584.52H293V438.39L439.13 292.26H585.26Z"
        fill="currentColor"
      />
      <path
        d="M585.26 0V146.13L439.13 292.26H293V147.63L440.63 0H585.26Z"
        fill="currentColor"
      />
    </svg>
  );
}
