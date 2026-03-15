import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export const Button = forwardRef(({ className, variant = 'gradient', size = 'default', children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)] disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    gradient: "btn-gradient hover:scale-[1.02]",
    outline: "btn-outline hover:scale-[1.02]",
    ghost: "hover:bg-[var(--card)] text-[var(--text-primary)] hover:text-white",
  };
  
  const sizes = {
    default: "h-12 px-6 py-3",
    sm: "h-9 px-4 py-2 text-sm",
    lg: "h-14 px-8 py-4 text-lg",
    icon: "h-12 w-12",
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
