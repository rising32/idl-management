import React, { ErrorInfo } from 'react';
import useNotFound from '../../lib/hooks/useNotFound';
import NotFoundPage from '../../pages/NotFoundPage';
import ChunkErrorScreen from './ChunkErrorScreen';
import CrashErrorScreen from './CrashErrorScreen';

type Props = {
  children: React.ReactNode;
};
type State = {
  hasError: boolean;
  chunkError: boolean;
};
class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    chunkError: false,
  };

  static getDerivedStateFromError(error: Error) {
    if (error.name === 'ChunkLoadError') {
      return {
        chunkError: true,
      };
    }
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === 'production') {
      console.log(error, errorInfo);
    }
  }
  handleResolveError = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    if (this.state.chunkError) {
      return <ChunkErrorScreen />;
    }
    if (this.state.hasError) {
      return <CrashErrorScreen onResolve={this.handleResolveError} />;
    }

    return <ErrorBoundaryWrapper hasError={this.state.hasError}>{this.props.children}</ErrorBoundaryWrapper>;
  }
}

type ErrorBoundaryWrapperProps = {
  children: React.ReactNode;
  hasError: boolean;
};
function ErrorBoundaryWrapper(props: ErrorBoundaryWrapperProps) {
  const { isNotFound } = useNotFound();

  if (isNotFound) {
    return <NotFoundPage />;
  }

  return <>{props.children}</>;
}
export default ErrorBoundary;
