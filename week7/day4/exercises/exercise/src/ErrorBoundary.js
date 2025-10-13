import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
        console.error("ErrorBoundary caught an error:", error, info);
    }

    handleReset = () => {
        this.setState({ hasError: false });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="alert alert-danger text-center mt-5">
                    <h4>Something went wrong!</h4>
                    <button className="btn btn-secondary mt-3" onClick={this.handleReset}>
                        Go Back
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
