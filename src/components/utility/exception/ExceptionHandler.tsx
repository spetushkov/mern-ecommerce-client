import React from 'react';

type Props = {
  children: React.ReactNode;
};

type State = {
  error?: Error;
  errorInfo?: React.ErrorInfo;
};

export class ExceptionHandler extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(JSON.stringify({ error, errorInfo }));

    this.setState({ errorInfo });
  }

  render(): React.ReactNode {
    if (!this.state) {
      return this.props.children;
    }

    const { error, errorInfo } = this.state;
    if (!error) {
      return this.props.children;
    }

    return (
      <div>
        <div>
          <p>There was an error in loading this page.</p>
        </div>
        {errorInfo && (
          <div>
            <details>
              <summary>Click for error details</summary>
              {errorInfo.componentStack}
            </details>
          </div>
        )}
      </div>
    );
  }
}
