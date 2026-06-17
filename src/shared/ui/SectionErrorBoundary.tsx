import React, { Component, ReactNode } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class SectionErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Here we can link telemetry later
    console.error("Section Error Caught:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      const message = this.props.fallbackMessage || "Не удалось загрузить этот блок.";
      return (
        <section className="py-app -mx-4 px-4 sm:mx-0 sm:px-0 opacity-80 transition-opacity">
          <Card className="flex flex-col items-center justify-center min-h-[200px] bg-red-50/50 border-red-100 p-8 text-center" style={{ borderRadius: 'var(--app-radius)' }}>
            <AlertTriangle className="w-10 h-10 text-red-400 mb-4" strokeWidth={1.5} />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Ой, что-то пошло не так</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-md">{message}</p>
            <Button variant="secondary" size="sm" onClick={this.handleRetry} className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              Попробовать снова
            </Button>
          </Card>
        </section>
      );
    }

    return this.props.children;
  }
}
