'use client';

import type { ChangeEvent, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const inputClass =
  'w-full rounded-sm border border-line bg-white px-3 py-2.5 text-sm text-charcoal placeholder:text-mist/80 focus-ring focus-visible:border-forest disabled:bg-cream';

export function FieldLabel({ htmlFor, children, hint }: { htmlFor?: string; children: ReactNode; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline justify-between gap-3 text-[0.82rem] font-medium text-ink">
      <span>{children}</span>
      {hint && <span className="text-[0.7rem] font-normal text-mist">{hint}</span>}
    </label>
  );
}

export function NumberInput({
  id, label, value, onChange, unit, min, max, step = 1, hint, error, placeholder,
}: {
  id: string;
  label: string;
  value: number | '';
  onChange: (value: number | '') => void;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} hint={hint}>{label}</FieldLabel>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value;
            onChange(raw === '' ? '' : Number(raw));
          }}
          className={cn(inputClass, unit && 'pr-14', error && 'border-orange')}
        />
        {unit && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-mist">{unit}</span>}
      </div>
      {error && <p className="mt-1 text-xs text-[#B4652B]">{error}</p>}
    </div>
  );
}

export function TextInput({
  id, label, value, onChange, placeholder, hint, error, type = 'text',
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  type?: 'text' | 'date';
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} hint={hint}>{label}</FieldLabel>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputClass, error && 'border-orange')}
      />
      {error && <p className="mt-1 text-xs text-[#B4652B]">{error}</p>}
    </div>
  );
}

export function SelectInput<T extends string>({
  id, label, value, onChange, options, hint,
}: {
  id: string;
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  hint?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} hint={hint}>{label}</FieldLabel>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as T)} className={cn(inputClass, 'appearance-none')}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export function SegmentedControl<T extends string>({
  label, value, onChange, options,
}: {
  label?: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div>
      {label && <p className="mb-1.5 text-[0.82rem] font-medium text-ink">{label}</p>}
      <div className="inline-flex flex-wrap gap-1 rounded-sm border border-line bg-white p-1">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={value === o.value}
            className={cn(
              'rounded-sm px-3 py-1.5 text-xs transition-colors focus-ring',
              value === o.value ? 'bg-forest text-white' : 'text-charcoal/70 hover:bg-mint',
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
