import React from "react";

type ConfirmDialogProps = {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title = "Confirmation",
  message,
  onConfirm,
  onCancel,
  
}) => {

  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-middle backdrop-blur-sm">
      <div className="modal-box mb-60">
        <h3 className="font-bold text-lg text-center">{title}</h3>
        <p className="py-4 text-center">{message}</p>

        <div className="flex justify-center mt-4">
          
          <button
            className="btn bg-red-500 mr-4 rounded-[8px] text-white"
            onClick={onCancel}
          >
            Non
          </button>

          <button
            className="btn bg-green-500 ml-3 rounded-[8px] text-white"
            onClick={onConfirm}
          >
            Oui
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmDialog;
