import React from "react";
import Modal from "./modal";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorInfo: null
        };
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            errorInfo: info
        });
    }

    occurError = () => {
        throw new Error("Oops! Something went wrong 😬");
    };

    handleClose = () => {
        this.setState({ hasError: false, errorInfo: null });
    };

    render() {
        return (
            <div className="text-center mt-5">
                <button
                    onClick={this.occurError}
                    className="btn btn-danger btn-lg px-5"
                >
                    Trigger Error
                </button>

                {this.state.hasError && (
                    <Modal
                        message="An unexpected error occurred!"
                        onClose={this.handleClose}
                    />
                )}
            </div>
        );
    }
}

export default ErrorBoundary;
