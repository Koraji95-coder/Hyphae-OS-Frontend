import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-fungal-500/10 border border-fungal-500 rounded-lg">
          <h2 className="text-lg font-bold text-fungal-300 mb-2">Something went wrong</h2>
          <p className="text-gray-400">{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}