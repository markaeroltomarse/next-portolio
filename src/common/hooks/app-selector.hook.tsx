import { AppState } from "@store/index";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default useAppSelector;
