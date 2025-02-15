import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva(
    "corder text-center p-2 text-sm flex items-center w-full",
    {
        variants:{
            variant: {
                warning: "bg-yellow-200/80 border-yellow-30 text-primary",
                success:"bg-emerald-500 border-emerald-800 text-secondary",
            }
        },
        defaultVariants:{
            variant: "warning",
        },
    }
)

i


export const Banner = () => {
    return (
        <div>Banner</div>
    )
}