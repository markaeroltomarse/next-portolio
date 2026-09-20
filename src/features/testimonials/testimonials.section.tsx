import AnimateOnScroll from "@components/Displays/AnimateOnScroll";
import Section from "@components/Displays/Section";
import SectionHeading from "@components/Displays/SectionHeading";
import { TestimonialsData } from "@common_types/cms.types";
import Image from "next/image";
import { FiMessageSquare } from "react-icons/fi";

interface TestimonialsSectionProps {
  data: TestimonialsData;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ data }) => {
  if (data.items.length === 0) return null;

  return (
    <Section id="testimonials">
      <AnimateOnScroll>
        <SectionHeading title={data.heading} subtitle={data.subtitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="rounded-[28px] border border-border/60 bg-card p-6 shadow-ios relative transition-all duration-300 hover:border-accent/40 hover:shadow-ios-lg hover:-translate-y-0.5"
            >
              <FiMessageSquare
                size={20}
                className="text-accent/25 absolute top-5 right-5"
              />
              <p className="text-[15px] text-muted-foreground leading-relaxed italic">
                &ldquo;{item.content}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                {item.avatar && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-border">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-[14px] font-semibold">{item.name}</p>
                  <p className="text-[13px] text-muted-foreground">
                    {item.role}
                    {item.company && ` at ${item.company}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimateOnScroll>
    </Section>
  );
};

export default TestimonialsSection;
