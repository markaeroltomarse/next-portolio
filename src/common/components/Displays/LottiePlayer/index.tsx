import dynamic from "next/dynamic";
import type { LottieComponentProps } from "lottie-react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type LottiePlayerProps = Omit<LottieComponentProps, "animationData"> & {
  animationData: unknown;
};

const LottiePlayer: React.FC<LottiePlayerProps> = (props) => (
  <Lottie loop autoplay {...props} />
);

export default LottiePlayer;
