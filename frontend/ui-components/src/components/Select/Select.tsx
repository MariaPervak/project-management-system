import './Select.scss';
import {FC} from "react";

export type Option = {
    id: number;
    value: string;
}

interface SelectProps {
    name: string;
    value: Option | null;
    options: Option[];
    placeholder?: string;
    onChange: (e: any) => void;
}

const Select: FC<SelectProps> = (props) => {
    const {name, value, options, placeholder, onChange,   ...rest} = props
    return (
        <div className='select-wrapper'>
            <select
                className={`select ${!value? 'select_default': ''}`}
                // value={(value && value.id) || "DEFAULT"}
                name={name}
                defaultValue={"DEFAULT"}
                onChange={onChange}
                {...rest}
            >
                <option
                    className="select__default-value"
                    value="DEFAULT">
                    {placeholder || 'Выберите'}
                </option>
                {options.map((option) => (
                    <option key={option.id} value={option.id} selected={value && value.id === option.id || false}>{option.value}</option>
                ))}
            </select>
        </div>
    );
};

export default Select;