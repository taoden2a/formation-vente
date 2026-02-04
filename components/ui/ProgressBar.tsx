import { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number // 0-100
  showLabel?: boolean
}

export function ProgressBar({
  className,
  value,
  showLabel = false,
  ...props
}: ProgressBarProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100)

  return (
    <div className={clsx('space-y-2', className)} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Progression</span>
          <span className="font-semibold text-gray-900">{Math.round(clampedValue)}%</span>
        </div>
      )}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}
