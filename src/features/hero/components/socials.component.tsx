import useBreakpoints from "@hooks/breakpoints.hook";
import Link from "next/link";

export interface ISocial {
  link: string;
  icon: React.ReactNode;
}

export interface SocialsComponentProps {
  items: ISocial[];
}

const SocialsComponent: React.FC<SocialsComponentProps> = (props) => {
  const { items } = props;

  const { sm, xs } = useBreakpoints();
  const isMobile = sm === true || xs === true;

  return (
    <div className={`flex gap-5 items-center ${isMobile && "justify-center"}`}>
      {items.map((social: ISocial) => (
        <Link key={social.link} target="_blank" href={social.link}>
          {social.icon}
        </Link>
      ))}
    </div>
  );
};

export default SocialsComponent;
