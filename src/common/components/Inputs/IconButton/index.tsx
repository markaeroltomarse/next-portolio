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
  const styles = `inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors ${className}`;

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
