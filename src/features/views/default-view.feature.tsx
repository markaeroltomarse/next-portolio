export interface DefaultViewProps {
  children?: React.ReactNode;
  className?: string;
}

const DefaultView: React.FC<DefaultViewProps> = (props) => {
  const { children, className } = props;

  return <div className={className}>{children}</div>;
};

export default DefaultView;
