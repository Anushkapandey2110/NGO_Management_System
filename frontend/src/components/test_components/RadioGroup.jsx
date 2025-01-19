import React from 'react';

const RadioGroupContext = React.createContext(null);

export const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  const [value, setValue] = React.useState(props.value || props.defaultValue);

  return (
    <RadioGroupContext.Provider value={{ value, setValue }}>
      <div ref={ref} className={className} {...props} />
    </RadioGroupContext.Provider>
  );
});

RadioGroup.displayName = "RadioGroup";

export const RadioGroupItem = React.forwardRef(({ className, value, ...props }, ref) => {
  const context = React.useContext(RadioGroupContext);
  const checked = context.value === value;

  return (
    <button
      ref={ref}
      className={`${className} ${checked ? 'bg-primary text-primary-foreground' : 'bg-background'} relative rounded-full h-4 w-4 border border-primary`}
      onClick={() => context.setValue(value)}
      aria-checked={checked}
      role="radio"
      {...props}
    >
      {checked && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-background h-2 w-2" />
        </span>
      )}
    </button>
  );
});

RadioGroupItem.displayName = "RadioGroupItem";