import {createPortal} from "react-dom";
import './Toast.scss';

interface ToastProps {
  message?: string;
  onClose?: () => void;
}

const Toast = ({message, onClose}: ToastProps) => {
  return (
    <>
      {createPortal(
        <div className="toast">
          <div className="toast__close" onClick={onClose}>x</div>
          <div>{message}</div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Toast;