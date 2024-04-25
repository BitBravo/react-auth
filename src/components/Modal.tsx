import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  close: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, close, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50">
      <div className="relative mx-auto min-w-[560px] max-w-sm rounded-lg bg-white px-8 py-6 shadow-xl">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <div className="py-6">{children}</div>
        <button
          onClick={close}
          className="rounded-lg border bg-blue-500 px-4 py-2 text-white shadow-lg hover:bg-blue-400">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
