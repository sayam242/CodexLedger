import React, { useState } from 'react';

export interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({ children, defaultValue, className = '', value, onValueChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const currentValue = value || activeTab;

  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, {
          value: currentValue,
          onValueChange: onValueChange || setActiveTab,
        } as any)
      )}
    </div>
  );
}

export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return (
    <div className={`inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1 ${className}`}>
      {children}
    </div>
  );
}

export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onValueChange?: (value: string) => void;
}

export function TabsTrigger({ value, children, className = '', onValueChange, ...props }: TabsTriggerProps) {
  return (
    <button
      onClick={() => onValueChange?.(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  currentValue?: string;
}

export function TabsContent({ value, children, className = '', currentValue }: TabsContentProps) {
  if (currentValue !== value) return null;

  return (
    <div className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}>
      {children}
    </div>
  );
}
