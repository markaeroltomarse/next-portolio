import FloatingImages from "@components/Displays/FloatingImages";
import { useRouter } from "next/router";
import { BiLogoPostgresql } from "react-icons/bi";
import { HiCode } from "react-icons/hi";
import { LiaReact } from "react-icons/lia";
import {
  SiAmazonec2,
  SiDocker,
  SiGit,
  SiGraphql,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiPrisma,
  SiTypescript,
} from "react-icons/si";
export interface SkillsFeatureProps {
  className?: string;
}

const SkillsFeature: React.FC<SkillsFeatureProps> = (props) => {
  const { className } = props;

  const router = useRouter();
  return (
    <div className={`${className} `}>
      {" "}
      <h2 className="text-2xl font-bold flex gap-3 items-center container mx-auto">
        My Skills <HiCode size={30} />
      </h2>
      {router.query?.sview === "2" && (
        <FloatingImages
          data={[
            { icon: <LiaReact size={100} color="#4a69bd" />, name: "ReactJS" },
            { icon: <SiNextdotjs size={100} />, name: "NextJS" },
            { icon: <SiNestjs size={100} color="#b71540" />, name: "NestJS" },
            {
              icon: <SiTypescript size={100} color="#1e3799" />,
              name: "Typescript",
            },
            { icon: <SiGraphql size={100} color="#ff6b81" />, name: "GraphQL" },
            {
              icon: <BiLogoPostgresql size={100} color="#1e90ff" />,
              name: "Postgres",
            },
            { icon: <SiPrisma size={100} />, name: "Prisma" },
            { icon: <SiAmazonec2 size={100} color="#ffa502" />, name: "EC2" },
            { icon: <SiDocker size={100} color="#5352ed" />, name: "ReactJS" },
            { icon: <SiGit size={100} color="#ff6348" />, name: "GIT" },
            { icon: <SiMongodb size={100} color="#2ed573" />, name: "GIT" },
          ]}
        />
      )}
    </div>
  );
};

export default SkillsFeature;
