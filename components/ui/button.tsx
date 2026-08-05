import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#064E3B] text-white shadow hover:bg-[#032D22] hover:shadow-md",
        destructive:
          "bg-[#C1663F] text-white shadow-sm hover:bg-[#A8532F]",
        outline:
          "border border-[#064E3B]/20 bg-transparent text-[#064E3B] hover:bg-[#064E3B]/5 hover:border-[#064E3B]/40",
        secondary:
          "bg-[#C9A24B] text-[#032D22] hover:bg-[#B8923A] hover:shadow-sm font-bold",
        ghost: "hover:bg-[#064E3B]/10 hover:text-[#064E3B]",
        link: "text-[#064E3B] underline-offset-4 hover:underline",
        emerald: "bg-[#2E9B7C] text-white hover:bg-[#258369] shadow-sm",
        gold: "bg-[#C9A24B] text-[#032D22] font-bold hover:bg-[#B8923A]",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "h-13 rounded-full px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
