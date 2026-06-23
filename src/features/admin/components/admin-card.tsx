interface AdminCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const AdminCard: React.FC<AdminCardProps> = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
    {title && (
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    )}
    {children}
  </div>
);

export default AdminCard;
