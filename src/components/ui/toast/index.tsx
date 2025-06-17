"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useToast } from "../use-toast";
import { cn } from "@/lib/utils";

export function ToastContainer() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onDismiss={() => dismiss(toast.id)}
        />
      ))}
    </div>
  );
}

type ToastProps = {
  toast: {
    id: string;
    title?: string;
    description?: string;
    variant?: "default" | "destructive" | "success";
  };
  onDismiss: () => void;
};

function Toast({ toast, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Handle entrance and exit animations
  useEffect(() => {
    // Entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss();
    }, 200); // Matches the CSS transition duration
  };

  return (
    <div
      className={cn(
        "bg-background border rounded-md shadow-lg p-4 transition-all duration-200 transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        toast.variant === "destructive" && "border-destructive/50 text-destructive",
        toast.variant === "success" && "border-green-500/50 text-green-600 dark:text-green-400"
      )}
    >
      <div className="flex justify-between items-start gap-2">
        {toast.title && <h4 className="font-medium">{toast.title}</h4>}
        <button
          onClick={handleDismiss}
          className="rounded-md h-6 w-6 p-1 hover:bg-muted flex items-center justify-center"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
      {toast.description && (
        <div className="text-sm text-muted-foreground mt-1">{toast.description}</div>
      )}
    </div>
  );
}
