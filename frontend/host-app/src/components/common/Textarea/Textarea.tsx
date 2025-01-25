import './Textarea.scss';

interface TextAriaProps {
  name: string,
  placeholder: string,
  onChange: (e: any) => void,
}

const TextArea = ({name, placeholder, onChange, ...rest}:TextAriaProps) => {
  return (
    <div className="textarea">
      <textarea
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default TextArea;