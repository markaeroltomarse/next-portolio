import { BsPersonWorkspace } from "react-icons/bs";
import DemoCoverflow from "./components/projects-list.component";

export interface ProjectsFeatureProps {
  className?: string;
}

const ProjectsFeature: React.FC<ProjectsFeatureProps> = (props) => {
  const { className } = props;

  return (
    <div className={`${className}  `}>
      <h2 className="text-2xl font-bold flex gap-3 items-center ">
        Personal and Contributed Projects <BsPersonWorkspace size={30} />
      </h2>
      <br />
      <DemoCoverflow />
    </div>
  );
};

export default ProjectsFeature;
