import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#064E3B] text-white shadow hover:bg-[#032D22]",
        secondary:
          "border-[#C9A24B] bg-[#C9A24B]/15 text-[#7B591D]",
        outline: "text-foreground border-border",
        jade: "border-[#2E9B7C] bg-[#2E9B7C]/15 text-[#064E3B]",
        terracotta: "border-[#C1663F] bg-[#C1663F]/15 text-[#C1663F]",
        champagne: "border-[#C9A24B] bg-[#F8E7C9]/30 text-[#032D22]",
        gold: "border-[#C9A24B] bg-[#C9A24B]/20 text-[#7B591D]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
