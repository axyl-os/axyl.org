// Implementation of a simple toast notification system
import { useState, useCallback } from "react";

type ToastVariant = "default" | "destructive" | "success";

type ToastProps = {
  title?: string;
  description?: string;
  duration?: number;
  variant?: ToastVariant;
};

type Toast = ToastProps & {
  id: string;
  createdAt: Date;
};

// Global toast state
let toasts: Toast[] = [];
let listeners: Array<(toasts: Toast[]) => void> = [];

// Notify all listeners when toasts change
const notifyListeners = () => {
  listeners.forEach((listener) => listener([...toasts]));
};

// Generate unique ID for toasts
const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

export function useToast() {
  const [localToasts, setLocalToasts] = useState<Toast[]>(toasts);

  // Subscribe to toast changes
  useState(() => {
    const listener = (updatedToasts: Toast[]) => {
      setLocalToasts(updatedToasts);
    };

    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  });

  // Create a new toast
  const toast = useCallback(({ title, description, duration = 5000, variant = "default" }: ToastProps) => {
    const id = generateId();
    const newToast: Toast = {
      id,
      title,
      description,
      duration,
      variant,
      createdAt: new Date(),
    };

    toasts = [...toasts, newToast];
    notifyListeners();

    // Auto-dismiss after duration
    if (duration !== Infinity) {
      setTimeout(() => {
        dismiss(id);
      }, duration);
    }

    return id;
  }, []);

  // Dismiss a toast by ID
  const dismiss = useCallback((toastId: string) => {
    toasts = toasts.filter((t) => t.id !== toastId);
    notifyListeners();
  }, []);

  return {
    toast,
    dismiss,
    toasts: localToasts,
  };
}
