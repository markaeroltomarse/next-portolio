interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => (
  <div className={`w-full max-w-6xl mx-auto px-6 sm:px-8 ${className}`}>{children}</div>
);

export default Container;
