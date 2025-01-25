import './Modal.scss';
import type { PropsWithChildren } from "react";
import {createPortal} from "react-dom";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  title: string;
  buttonText?: string;
  onAction?: () => void;
  onClose?: () => void;
}

const Modal = ({
   isOpen,
   title,
   buttonText,
   onAction,
   onClose,
   children
}: ModalProps) => {
  return (
    <>
      {isOpen && createPortal(
        <div className="modal">
          <div className="modal__inner">
            <button className="modal__close" onClick={onClose}>x</button>
            <div className="modal__title">{title}</div>
            <div className="modal__content">{children}</div>
            <div className="modal__footer">
              {buttonText && <button className="modal__button" onClick={onAction}>{buttonText}</button>}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Modal;