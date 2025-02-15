import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { IconBadge } from "./icon-badge";

const bannerVariants = cva(
    "border  p-3 text-sm text-center flex items-center w-full",
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

interface BannerProps extends VariantProps<typeof bannerVariants> {
    label:string;
}

const iconMap = {
    warning: AlertTriangle,
    success: CheckCircle2,
};

export const Banner = (
    {label,variant}:  BannerProps
) => {
    const Icon = iconMap[variant || "warning"]
    return (
        <div className={cn(bannerVariants({variant}))}>

        <Icon className = "h-4 w-4" />
        <div>{label}</div>

        </div>

    )
}