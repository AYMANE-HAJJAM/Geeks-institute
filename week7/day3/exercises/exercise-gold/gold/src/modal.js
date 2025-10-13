import React from "react";
import "./modal.css";

class Modal extends React.Component {
    render() {
        const { message, onClose } = this.props;

        return (
            <div className="modal-background">
                <div className="modal-dialog">
                    <div className="modal-content shadow-lg">
                        <div className="modal-header bg-danger text-white">
                            <h5 className="modal-title">Error</h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                onClick={onClose}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>{message}</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
