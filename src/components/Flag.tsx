import type { ReactNode } from 'react';

type FlagCode = 'IE' | 'DE' | 'US' | 'PL' | 'UY' | 'AR';

const flags: Record<FlagCode, ReactNode> = {
  IE: (
    <>
      <rect width="10" height="15" fill="#169b62" />
      <rect x="10" width="10" height="15" fill="#fff" />
      <rect x="20" width="10" height="15" fill="#ff883e" />
    </>
  ),
  DE: (
    <>
      <rect width="30" height="5" fill="#000" />
      <rect y="5" width="30" height="5" fill="#dd0000" />
      <rect y="10" width="30" height="5" fill="#ffce00" />
    </>
  ),
  US: (
    <>
      <rect width="30" height="15" fill="#b22234" />
      <rect y="1.15" width="30" height="1.15" fill="#fff" />
      <rect y="3.46" width="30" height="1.15" fill="#fff" />
      <rect y="5.77" width="30" height="1.15" fill="#fff" />
      <rect y="8.08" width="30" height="1.15" fill="#fff" />
      <rect y="10.38" width="30" height="1.15" fill="#fff" />
      <rect y="12.69" width="30" height="1.15" fill="#fff" />
      <rect width="12" height="8.08" fill="#3c3b6e" />
    </>
  ),
  PL: (
    <>
      <rect width="30" height="7.5" fill="#fff" />
      <rect y="7.5" width="30" height="7.5" fill="#dc143c" />
    </>
  ),
  UY: (
    <>
      <rect width="30" height="15" fill="#fff" />
      <rect y="1.67" width="30" height="1.67" fill="#0038a8" />
      <rect y="5" width="30" height="1.67" fill="#0038a8" />
      <rect y="8.33" width="30" height="1.67" fill="#0038a8" />
      <rect y="11.67" width="30" height="1.67" fill="#0038a8" />
      <rect width="9" height="8.33" fill="#fff" />
      <circle cx="4.5" cy="4.17" r="2.2" fill="#fcd116" />
    </>
  ),
  AR: (
    <>
      <rect width="30" height="15" fill="#74acdf" />
      <rect y="5" width="30" height="5" fill="#fff" />
      <circle cx="15" cy="7.5" r="1.8" fill="#85340a" stroke="#fcbf49" strokeWidth="0.5" />
    </>
  ),
};

export function Flag({ code, className }: { code: FlagCode; className?: string }) {
  return (
    <svg
      viewBox="0 0 30 15"
      className={className ?? 'inline-block w-[18px] h-[12px] align-middle rounded-[2px]'}
      role="img"
      aria-label={`Bandiera ${code}`}
    >
      {flags[code]}
    </svg>
  );
}
