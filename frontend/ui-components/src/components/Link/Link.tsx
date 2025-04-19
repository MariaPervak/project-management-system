import {AnchorHTMLAttributes, FC} from 'react';
import './Link.scss';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>{
    href: string;
    text: string;
}

const Link: FC<LinkProps> = (props) => {
    const {href, text, ...rest} = props;
    return (
        <a href={href} {...rest} className={`link ${rest.className || ''}`}>{text}</a>
    );
};

export default Link;