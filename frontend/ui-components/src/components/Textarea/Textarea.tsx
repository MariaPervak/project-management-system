import './Textarea.scss';
import {FC} from "react";

interface TextareaProps {
    name: string;
    value: string;
    placeholder?: string;
    onChange?: (e: any) => void;
}

const Textarea: FC<TextareaProps> = (props) => {
    const {name, value, placeholder, onChange, ...rest} = props;
    return (
        <textarea className="textarea" name={name} value={value} placeholder={placeholder} onChange={onChange} {...rest}></textarea>
    );
};

export default Textarea;