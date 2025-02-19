import './Input.scss';

interface InputProps {
  type: string,
  name: string,
  placeholder: string,
  onChange: (e: any) => void,
}

const Input = ({type, name, placeholder, onChange, ...rest}:InputProps) => {
  return (
    <div className="input">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default Input;