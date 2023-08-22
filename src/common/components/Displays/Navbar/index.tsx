import Button from "@components/Inputs/Button";
import useAppDispatch from "@hooks/app-dispatch.hook";
import useAppSelector from "@hooks/app-selector.hook";
import { setIsDarkMode } from "@store/slices/componentes.slice";
import { BsCodeSlash } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { MdDarkMode } from "react-icons/md";

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = (props) => {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((store) => store.components.isDarkMode);
  return (
    <div className="flex justify-between max-w-screen-2xl mx-auto py-10 items-center">
      <h2 className="text-3xl flex gap-2 items-center">
        <BsCodeSlash className="text-green-600" size={40} />
        <b>MTOMARSE</b>
      </h2>
      <div className="flex gap-5">
        <Button
          className="bg-yellow-200 rounded"
          onClick={() => dispatch(setIsDarkMode(!isDark))}
          noBorder
        >
          <MdDarkMode className="text-yellow-400" size={20} />
        </Button>

        <Button className="bg-blue-500 rounded flex gap-3" noBorder>
          <ImProfile className="text-blue-100" size={20} />
          <h5>DOWNLOAD MY CV</h5>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
