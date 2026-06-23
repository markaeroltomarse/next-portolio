interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
    {subtitle && (
      <p className="mt-2 text-muted-foreground text-lg">{subtitle}</p>
    )}
  </div>
);

export default SectionHeading;
