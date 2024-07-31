import React from 'react';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
    return (
        <div className={`modal ${open ? 'display-block' : 'display-none'} z-10`}>
            <div className="modal-main bg-[#1C1C26] border-white border-2 p-[20px]">
                <div className="modal-head text-white">
                    <h1>Disclaimer!!</h1>
                </div>
                <div className="modal-body flex justify-center text-white">{children}</div>
                <div className="btn-container p-[8px] bg-white m-[5px] rounded-md">
                    <button type="button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

