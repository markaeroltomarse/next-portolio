interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle }) => (
  <div className="mb-14">
    <div className="h-[3px] w-8 rounded-full bg-accent mb-4" />
    <h2 className="text-[34px] md:text-[42px] font-bold tracking-[-0.02em] leading-[1.1]">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-3 text-muted-foreground text-[17px] leading-relaxed max-w-2xl">
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeading;
