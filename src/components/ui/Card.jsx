import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export const Card = forwardRef(({ className, variant = 'default', children, ...props }, ref) => {
  const variants = {
    default: "card",
    gradient: "card-gradient",
  };

  return (
    <div
      ref={ref}
      className={cn(variants[variant], "p-6 sm:p-8", className)}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
