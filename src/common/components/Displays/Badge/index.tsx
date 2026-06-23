interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "default" }) => {
  const styles =
    variant === "accent"
      ? "bg-accent/10 text-accent"
      : "bg-muted text-muted-foreground";

  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${styles}`}>
      {children}
    </span>
  );
};

export default Badge;
