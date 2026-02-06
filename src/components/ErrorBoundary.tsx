"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

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
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-red-500 p-4 font-mono text-xs">
                    <div className="max-w-md break-words">
                        <h1 className="text-xl font-bold mb-2">Application Error</h1>
                        <p>{this.state.error?.toString()}</p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
