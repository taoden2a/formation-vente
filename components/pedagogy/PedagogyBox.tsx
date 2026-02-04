import { HTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

interface PedagogyBoxProps extends HTMLAttributes<HTMLDivElement> {
  color: 'blue' | 'yellow' | 'green' | 'orange'
  icon?: ReactNode
  title?: string
}

const colorConfig = {
  blue: {
    class: 'pedagogy-box-blue',
    label: 'Théorie',
    description: 'Compréhension',
  },
  yellow: {
    class: 'pedagogy-box-yellow',
    label: 'Attention',
    description: 'Point clé / Biais cognitif',
  },
  green: {
    class: 'pedagogy-box-green',
    label: 'Résumé',
    description: 'Validation / Éthique',
  },
  orange: {
    class: 'pedagogy-box-orange',
    label: 'Action',
    description: 'Exercice / Template',
  },
}

export function PedagogyBox({
  color,
  icon,
  title,
  children,
  className,
  ...props
}: PedagogyBoxProps) {
  const config = colorConfig[color]

  return (
    <div className={clsx(config.class, className)} {...props}>
      <div className="flex items-start gap-3">
        {icon && <div className="flex-shrink-0 mt-1">{icon}</div>}
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold text-lg mb-2">{title}</h4>
          )}
          <div className="prose prose-sm max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
