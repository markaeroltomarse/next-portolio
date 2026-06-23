import iconMap from "@lib/icon-map";

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  size = 24,
  className = "",
}) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} className={className} />;
};

export default DynamicIcon;
