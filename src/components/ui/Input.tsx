import { InputHTMLAttributes, forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function InputBase({ className = '', ...props }, ref) {
    return (
      <input
        ref={ref}
        className={`w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] ${className}`}
        {...props}
      />
    );
  }
);
