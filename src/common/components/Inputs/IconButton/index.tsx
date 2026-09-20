import Link from "next/link";

interface IconButtonProps {
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  ariaLabel: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  href,
  onClick,
  ariaLabel,
  className = "",
}) => {
  const styles = `inline-flex items-center justify-center w-10 h-10 rounded-full bg-foreground/[0.04] text-muted-foreground hover:text-foreground hover:bg-foreground/[0.08] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles}
        aria-label={ariaLabel}
      >
        {icon}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles} aria-label={ariaLabel}>
      {icon}
    </button>
  );
};

export default IconButton;
