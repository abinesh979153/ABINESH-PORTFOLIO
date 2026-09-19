import { Component } from "react";

// Catches rendering errors in child components so one broken section
// doesn't take down the entire page.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Section failed to render:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="section-shell text-center text-ink-muted">
          Something went wrong loading this section.
        </div>
      );
    }
    return this.props.children;
  }
}
