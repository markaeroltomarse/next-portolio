import Link from "next/link";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

const CardInner: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:border-accent/50 hover:shadow-md ${className}`}
  >
    {children}
  </div>
);

const Card: React.FC<CardProps> = ({ children, className, href }) => {
  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <CardInner className={className}>{children}</CardInner>
      </Link>
    );
  }
  return <CardInner className={className}>{children}</CardInner>;
};

export default Card;
