import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** 全站 SVG 插画统一设计令牌：同一种线宽、端点、色彩与标签排版。 */
export const C = {
  ink: '#173C30',
  forest: '#245B45',
  green: '#3E7A5C',
  mint: '#E5EFE6',
  pale: '#F2F7F3',
  orange: '#E89A51',
  sun: '#F2C879',
  cream: '#F7F6EF',
  charcoal: '#292D2A',
  mist: '#858B84',
  line: '#C8DEC9',
  white: '#FFFFFF',
} as const;

export interface ArtProps { className?: string; title?: string }

export function Art({ children, className, label = '科学减脂原创示意图', bare = false }: { children: ReactNode; className?: string; label?: string; bare?: boolean }) {
  return (
    <svg
      viewBox="0 0 240 180"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!bare && <rect x="0" y="0" width="240" height="180" rx="3" fill={C.cream} />}
      {children}
    </svg>
  );
}

export function Label({
  x, y, children, anchor = 'middle', size = 10, fill = C.ink, weight = 500,
}: {
  x: number; y: number; children: ReactNode; anchor?: 'start' | 'middle' | 'end'; size?: number; fill?: string; weight?: number;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={fill}
      fontFamily="'PingFang SC','Microsoft YaHei',system-ui,sans-serif">{children}</text>
  );
}

export function Arrow({ x1, y1, x2, y2, color = C.forest, width = 1.8, dashed = false }: {
  x1: number; y1: number; x2: number; y2: number; color?: string; width?: number; dashed?: boolean;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = 6;
  const p1 = [x2 - head * Math.cos(angle - Math.PI / 7), y2 - head * Math.sin(angle - Math.PI / 7)];
  const p2 = [x2 - head * Math.cos(angle + Math.PI / 7), y2 - head * Math.sin(angle + Math.PI / 7)];
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={dashed ? '4 4' : undefined} />
      <polygon points={`${x2},${y2} ${p1[0]},${p1[1]} ${p2[0]},${p2[1]}`} fill={color} />
    </g>
  );
}

/** 简化人形：用于人体科学插画，非写实、不带体型评价 */
export function BodySilhouette({ x = 120, y = 90, scale = 1, fill = C.mint, stroke = C.forest }: {
  x?: number; y?: number; scale?: number; fill?: string; stroke?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="0" cy="-58" r="11" fill={fill} stroke={stroke} strokeWidth="1.8" />
      <path d="M-12 -44 C-20 -38 -22 -20 -20 -4 L-18 26 L-7 26 L-5 2 L0 2 L5 26 L18 26 L20 -4 C22 -20 20 -38 12 -44 Z"
        fill={fill} stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M-20 -38 L-30 -8 M20 -38 L30 -8" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M-6 26 L-8 62 M6 26 L8 62" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </g>
  );
}

/** 统一的圆形食物符号，保持「食物图鉴」系列一致 */
export function FoodToken({ x, y, r = 15, fill = C.sun, stroke = C.forest, detail }: {
  x: number; y: number; r?: number; fill?: string; stroke?: string; detail?: ReactNode;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} stroke={stroke} strokeWidth="1.6" />
      {detail}
    </g>
  );
}

export function Caption({ y = 168, children }: { y?: number; children: ReactNode }) {
  return <Label x={120} y={y} size={9} fill={C.mist} weight={400}>{children}</Label>;
}
