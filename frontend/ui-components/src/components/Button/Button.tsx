import {PropsWithChildren} from "react";
import './Button.scss';

interface ButtonProps extends PropsWithChildren {
  onClick?: (e: any) => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button = ({ onClick, variant, className, children, ...rest }: ButtonProps) => {
  const buttonVariant = variant || 'primary' ;
  return (
    <button className={`button button_${buttonVariant} ${className? className: ''}`} onClick={onClick} {...rest}>{children}</button>
  );
};

export default Button;