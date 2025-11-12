'use client';

import { MinusIcon, PlusIcon } from 'lucide-react';
import { Button, Group, Input, NumberField } from 'react-aria-components';

interface NumberInputProps {
  value: number | null | undefined;
  onChange: (value: number | null | undefined) => void;
  min?: number;
  max?: number;
  defaultValue?: number;
  minusIcon?: React.ReactNode | false;
  plusIcon?: React.ReactNode | false;
  placeholder?: string;
  stepper?: number;
}

export default function NumberInput({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  defaultValue,
  minusIcon,
  plusIcon,
  placeholder,
  stepper = 1,
}: NumberInputProps) {
  const renderedMinusIcon = minusIcon === false ? null : (minusIcon ?? <MinusIcon size={16} aria-hidden='true' />);
  const renderedPlusIcon = plusIcon === false ? null : (plusIcon ?? <PlusIcon size={16} aria-hidden='true' />);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value?.trim();

    if (!value || value === '' || isNaN(Number(value))) {
      onChange(null);
      return;
    }

    const number = Number(value);
    // Allow typing intermediate values, enforce min/max on blur
    onChange(number);
  };

  const handleBlur = () => {
    if (value === null || value === undefined || isNaN(value)) {
      return;
    }

    // Enforce min/max constraints when user finishes typing
    if (value < min) {
      onChange(min);
    } else if (value > max) {
      onChange(max);
    }
  };

  function handleIncrement() {
    if (value === null || value === undefined || isNaN(value)) {
      onChange(stepper);
      return;
    }

    const newValue = value + stepper;

    if (newValue > max) {
      return;
    }

    onChange(newValue);
  }

  function handleDecrement() {
    if (value === null || value === undefined || isNaN(value)) {
      onChange(-stepper);
      return;
    }

    const newValue = value - stepper;
    if (newValue < min) {
      return;
    }

    onChange(newValue);
  }

  return (
    <NumberField defaultValue={defaultValue} minValue={min} maxValue={max}>
      <div className='*:not-first:mt-2'>
        <Group className='relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border border-input text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:border-ring data-focus-within:ring-[3px] data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:border-destructive data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40'>
          {renderedMinusIcon && (
            <Button
              slot='decrement'
              className='-ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border border-input bg-background text-sm text-muted-foreground/80 transition-[color,box-shadow] hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
              onClick={handleDecrement}
            >
              {renderedMinusIcon}
            </Button>
          )}
          <Input
            className='w-full grow bg-background px-3 py-2 text-center text-foreground tabular-nums'
            placeholder={placeholder}
            value={value == null || isNaN(value) ? '' : value}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {renderedPlusIcon && (
            <Button
              slot='increment'
              className='-me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md border border-input bg-background text-sm text-muted-foreground/80 transition-[color,box-shadow] hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
              onClick={handleIncrement}
            >
              {renderedPlusIcon}
            </Button>
          )}
        </Group>
      </div>
    </NumberField>
  );
}
