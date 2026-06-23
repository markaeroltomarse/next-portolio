import { FiCheck, FiSave } from "react-icons/fi";

interface AdminSaveButtonProps {
  onClick: () => void;
  loading?: boolean;
  saved?: boolean;
}

const AdminSaveButton: React.FC<AdminSaveButtonProps> = ({
  onClick,
  loading,
  saved,
}) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
  >
    {saved ? (
      <>
        <FiCheck size={16} /> Saved
      </>
    ) : loading ? (
      "Saving..."
    ) : (
      <>
        <FiSave size={16} /> Save Changes
      </>
    )}
  </button>
);

export default AdminSaveButton;
