'use client'

import * as React from 'react'

import { cn } from '@/utilities/cn'

type FieldContext = {
  invalid?: boolean
}

const FieldContext = React.createContext<FieldContext>({})

const Field = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: 'vertical' | 'horizontal' | 'responsive'
    'data-invalid'?: boolean
  }
>(({ className, orientation = 'vertical', 'data-invalid': dataInvalid, ...props }, ref) => {
  const contextValue = React.useMemo(() => ({ invalid: dataInvalid }), [dataInvalid])
  return (
  <FieldContext.Provider value={contextValue}>
    <div
      ref={ref}
      role="group"
      data-slot="field"
      data-invalid={dataInvalid}
      className={cn(
        'grid gap-2',
        orientation === 'horizontal' && 'grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-start gap-4',
        orientation === 'responsive' && '@container/field-group grid-cols-1 @md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]',
        className,
      )}
      {...props}
    />
  </FieldContext.Provider>
  )
})
Field.displayName = 'Field'

const FieldGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="field-group"
      className={cn('flex flex-col gap-6', className)}
      {...props}
    />
  ),
)
FieldGroup.displayName = 'FieldGroup'

const FieldSet = React.forwardRef<HTMLFieldSetElement, React.HTMLAttributes<HTMLFieldSetElement>>(
  ({ className, ...props }, ref) => (
    <fieldset ref={ref} data-slot="field-set" className={cn('space-y-4', className)} {...props} />
  ),
)
FieldSet.displayName = 'FieldSet'

const FieldLegend = React.forwardRef<
  HTMLLegendElement,
  React.HTMLAttributes<HTMLLegendElement> & { variant?: 'legend' | 'label' }
>(({ className, variant = 'legend', ...props }, ref) => (
  <legend
    ref={ref}
    data-slot="field-legend"
    className={cn(
      'text-sm font-medium leading-none',
      variant === 'label' && 'text-primary/50 font-mono',
      className,
    )}
    {...props}
  />
))
FieldLegend.displayName = 'FieldLegend'

const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    data-slot="field-label"
    className={cn(
      'text-sm font-medium leading-none text-primary/50 font-mono select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      className,
    )}
    {...props}
  />
))
FieldLabel.displayName = 'FieldLabel'

const FieldDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} data-slot="field-description" className={cn('text-muted-foreground text-sm', className)} {...props} />
  ),
)
FieldDescription.displayName = 'FieldDescription'

type FieldErrorProps = React.HTMLAttributes<HTMLParagraphElement> & {
  errors?: (string | { message?: string } | undefined)[]
}

const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className, errors, children, ...props }, ref) => {
    const messages = errors?.map((e) => (typeof e === 'string' ? e : e?.message)).filter(Boolean) ?? []
    const content = children ?? (messages.length > 0 ? messages : null)
    if (!content) return null
    const renderContent = () => {
      if (!Array.isArray(content)) return content
      if (content.length > 1) {
        return (
          <ul className="list-disc pl-4">
            {(content as string[]).map((msg, i) => (
              <li key={`err-${i}`}>{msg}</li>
            ))}
          </ul>
        )
      }
      return content[0] ?? null
    }
    return (
      <p
        ref={ref}
        data-slot="field-error"
        role="alert"
        className={cn('text-destructive text-sm', className)}
        {...props}
      >
        {renderContent()}
      </p>
    )
  },
)
FieldError.displayName = 'FieldError'

const FieldContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} data-slot="field-content" className={cn('flex flex-col gap-2', className)} {...props} />,
)
FieldContent.displayName = 'FieldContent'

const FieldTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="field-title" className={cn('text-sm font-medium leading-none', className)} {...props} />
  ),
)
FieldTitle.displayName = 'FieldTitle'

const FieldSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="field-separator"
      className={cn('flex items-center gap-4', className)}
      {...props}
    >
      <div className="bg-border h-px flex-1" />
      {children}
      <div className="bg-border h-px flex-1" />
    </div>
  ),
)
FieldSeparator.displayName = 'FieldSeparator'

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
}
