import {PropsWithChildren} from "react";
import './Title.scss';

const Title = ({ children }: PropsWithChildren) => {
  return (
    <h1 className="title">
      {children}
    </h1>
  );
};

export default Title;