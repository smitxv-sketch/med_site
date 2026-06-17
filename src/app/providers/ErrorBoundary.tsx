import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/shared/ui/Button";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-app min-h-[300px] w-full max-w-lg mx-auto text-center gap-app bg-red-50/50 rounded-app">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center shadow-sm">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-2">Упс, что-то пошло не так</h2>
          <p className="text-gray-500 text-sm">
            При загрузке этого компонента произошла ошибка. Мы уже работаем над исправлением.
          </p>
          <Button 
            variant="outline" 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-2"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Попробовать снова
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
