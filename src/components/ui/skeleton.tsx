import { cn } from '@/lib/utils'

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}

interface SkeletonListProps extends React.HTMLAttributes<HTMLDivElement> {
  rows: number
}

export function SkeletonList({ rows, className, ...props }: SkeletonListProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }, (_, i) => i + 1).map((row) => (
        <Skeleton
          key={row}
          className={cn('animate-pulse rounded-md bg-muted', className)}
          {...props}
        />
      ))}
    </div>
  )
}
