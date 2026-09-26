import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.error("Application error:", error);
    console.error("Error information:", info);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-page">
          <div className="error-card">
            <h1>Something went wrong.</h1>

            <p>
              Addis Eats could not display this page.
            </p>

            <button
              onClick={this.handleRefresh}
              className="button"
            >
              Refresh
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;