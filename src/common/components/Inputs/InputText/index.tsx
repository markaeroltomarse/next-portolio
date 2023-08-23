import { ChangeEventHandler } from "react";

export interface InputProps {
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const { className, onChange, value } = props;

  return (
    <div className={`${className}`}>
      <input
        onChange={onChange}
        type="text"
        value={value}
        className="bg-slate-500 p-3 rounded-md w-full font-mono text-slate-50"
      />
    </div>
  );
};

export default Input;
