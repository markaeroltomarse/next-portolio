interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => (
  <div className={`max-w-5xl mx-auto px-6 ${className}`}>{children}</div>
);

export default Container;
