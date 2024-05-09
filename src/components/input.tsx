export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onUpdate: (value: string) => void;
}

const Input = ({ onUpdate, ...props }: InputProps) => {
  return (
    <input
      className="border border-gray-900 rounded-md px-3 py-1 h-12"
      onChange={(e) => onUpdate(e.currentTarget.value)}
      {...props}
    />
  );
};

export default Input;
