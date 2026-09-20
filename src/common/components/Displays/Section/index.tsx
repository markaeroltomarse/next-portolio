import Container from "@components/Displays/Container";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}

const Section: React.FC<SectionProps> = ({ id, children, className = "", muted = false }) => (
  <section
    id={id}
    className={`py-20 md:py-28 ${muted ? "bg-muted" : ""} ${className}`}
  >
    <Container>{children}</Container>
  </section>
);

export default Section;
