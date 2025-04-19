import './Input.scss';

interface InputProps {
    type?: string,
    name: string,
    value: string,
    placeholder?: string,
    onChange: (e: any) => void,
}

const Input = ({type, name, value, placeholder, onChange, ...rest}:InputProps) => {
  return (
    <div className="input">
      <input
        type={type || 'text'}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default Input;