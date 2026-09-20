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
    className={`rounded-[28px] border border-border/60 bg-card p-6 shadow-ios transition-all duration-300 hover:border-accent/40 hover:shadow-ios-lg hover:-translate-y-0.5 ${className}`}
  >
    {children}
  </div>
);

const Card: React.FC<CardProps> = ({ children, className, href }) => {
  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-[28px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <CardInner className={className}>{children}</CardInner>
      </Link>
    );
  }
  return <CardInner className={className}>{children}</CardInner>;
};

export default Card;
