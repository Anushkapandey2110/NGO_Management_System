// import React from "react"

// const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
//   const baseStyles =
//     "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

//   const variants = {
//     default: "bg-primary text-primary-foreground hover:bg-primary/90",
//     destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
//     outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
//     secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
//     ghost: "hover:bg-accent hover:text-accent-foreground",
//     link: "text-primary underline-offset-4 hover:underline",
//   }

//   const sizes = {
//     default: "h-10 px-4 py-2",
//     sm: "h-9 rounded-md px-3",
//     lg: "h-11 rounded-md px-8",
//     icon: "h-10 w-10",
//   }

//   const variantStyles = variants[variant] || variants.default
//   const sizeStyles = sizes[size] || sizes.default

//   return <button className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`} ref={ref} {...props} />
// })

// Button.displayName = "Button"

// export { Button }


import React from "react";

export const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-black text-white hover:bg-gray-800",
    outline:
      "border border-gray-300 text-black bg-white hover:bg-gray-100 focus-visible:ring-gray-300",
  };

  const sizes = {
    default: "h-10 px-6",
  };

  const variantStyles = variants[variant] || variants.default;
  const sizeStyles = sizes[size] || sizes.default;

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      ref={ref}
      {...props}
    />
  );
});
