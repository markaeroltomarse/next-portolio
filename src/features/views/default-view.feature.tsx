export interface DefaultViewProps {
  children?: React.ReactNode;
}

const DefaultView: React.FC<DefaultViewProps> = (props) => {
  const { children } = props;

  return <div className={`container mx-auto`}>{children}</div>;
};

export default DefaultView;
