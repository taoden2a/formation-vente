import { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'not-started' | 'in-progress' | 'completed' | 'default'
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'badge',
        {
          'badge-not-started': variant === 'not-started',
          'badge-in-progress': variant === 'in-progress',
          'badge-completed': variant === 'completed',
          'bg-gray-100 text-gray-700': variant === 'default',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
