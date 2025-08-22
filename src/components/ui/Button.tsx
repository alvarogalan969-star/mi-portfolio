import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'ghost';
};

export function Button({ variant = 'default', className = '', ...props }: Props) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const styles =
    variant === 'ghost'
      ? 'bg-transparent hover:bg-gray-100'
      : 'bg-black text-white hover:bg-gray-900';
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
