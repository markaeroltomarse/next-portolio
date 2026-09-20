interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "default" }) => {
  const styles =
    variant === "accent"
      ? "bg-accent/15 text-accent"
      : "bg-foreground/[0.05] text-muted-foreground";

  return (
    <span className={`inline-block rounded-full px-3 py-1 text-[12px] font-semibold tracking-tight ${styles}`}>
      {children}
    </span>
  );
};

export default Badge;
