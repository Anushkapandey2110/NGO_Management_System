import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

// Card Components
// export const  Card = ({ children, className = '' }) => {
//   return (
//     <div className={`rounded-lg border bg-white shadow-sm ${className}`}>
//       {children}
//     </div>
//   );
// };


// // export const CardContent = ({ children, className = '' }) => {
// //   return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
// // };


// // export const CardHeader = ({ children, className = '' }) => {
// //   return <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
// // };

// // export const CardTitle = ({ children, className = '' }) => {
// //   return <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
// // };

// // import React from "react"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={`text-sm text-muted-foreground ${className}`} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex items-center p-6 pt-0 ${className}`} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }




