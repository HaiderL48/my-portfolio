import { cn } from "@/lib/utils";
import { getTechIconEntry } from "@/lib/tech-icons";

type TechBadgeSize = "sm" | "md";

const sizeStyles: Record<
  TechBadgeSize,
  { wrap: string; icon: number; label: string }
> = {
  sm: {
    wrap: "text-xs px-2.5 py-1 gap-1.5",
    icon: 14,
    label: "font-medium",
  },
  md: {
    wrap: "text-sm px-4 py-2 gap-2",
    icon: 18,
    label: "font-medium",
  },
};

export function TechBadge({
  label,
  size = "md",
  className,
  variant = "outline",
}: {
  label: string;
  size?: TechBadgeSize;
  className?: string;
  variant?: "outline" | "muted" | "plain";
}) {
  const { icon: Icon, colorClass } = getTechIconEntry(label);
  const styles = sizeStyles[size];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full",
        styles.wrap,
        variant === "outline" &&
          "border border-border bg-card text-foreground/90",
        variant === "muted" && "bg-muted text-foreground/70",
        variant === "plain" && "text-foreground/70",
        className,
      )}
      title={label}
    >
      <Icon
        className={cn("shrink-0", colorClass)}
        size={styles.icon}
        aria-hidden
      />
      <span className={styles.label}>{label}</span>
    </span>
  );
}

export function TechBadgeList({
  items,
  size = "md",
  variant = "outline",
  className,
}: {
  items: string[];
  size?: TechBadgeSize;
  variant?: "outline" | "muted" | "plain";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((label) => (
        <TechBadge
          key={label}
          label={label}
          size={size}
          variant={variant}
        />
      ))}
    </div>
  );
}
