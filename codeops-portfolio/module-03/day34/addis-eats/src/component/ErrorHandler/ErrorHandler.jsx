```jsx
import React from "react";

class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error);
    console.error("Component stack:", errorInfo.componentStack);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>

          <p>
            This part of Addis Eats could not be displayed.
          </p>

          {import.meta.env.DEV && this.state.error && (
            <details>
              <summary>Developer details</summary>

              <pre>
                {this.state.error.toString()}
              </pre>
            </details>
          )}

          <button onClick={this.handleRetry}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorHandler;
```
