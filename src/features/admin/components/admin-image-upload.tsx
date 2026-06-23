import Image from "next/image";
import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";

interface AdminImageUploadProps {
  label: string;
  value: string;
  subfolder: string;
  onUpload: (newPath: string) => void;
}

const AdminImageUpload: React.FC<AdminImageUploadProps> = ({
  label,
  value,
  subfolder,
  onUpload,
}) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("subfolder", subfolder);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (json.success) {
        onUpload(json.data.path);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-start gap-4">
        {value && (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
            <Image src={value} alt="" fill className="object-cover" />
          </div>
        )}
        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            <FiUpload size={14} />
            {uploading ? "Uploading..." : "Choose Image"}
          </button>
          {value && (
            <p className="mt-1 text-xs text-gray-500 truncate max-w-[200px]">
              {value}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminImageUpload;
