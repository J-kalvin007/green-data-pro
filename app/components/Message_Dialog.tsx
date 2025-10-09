import React from "react";

type MessageDialogProps = {
   isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
};

const MessageDialog: React.FC<MessageDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
}) => {

  if (!isOpen) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">{title}</h3>
        <p className="py-4 text-center">{message}</p>

        {/* Boutons alignés avec espace autour */}
        <div className="flex justify-center mt-4">

          <button
            className="btn btn-error ml-4"
            onClick={onConfirm}
          >
            Ok
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default MessageDialog;
