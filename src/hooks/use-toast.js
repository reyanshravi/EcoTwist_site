"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle,
  XCircle,
  Info,
  AlertTriangle,
} from "lucide-react"; // custom icons

const TOAST_LIMIT = 3;
const DEFAULT_REMOVE_DELAY = 5000;

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
};

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toastTimeouts = new Map();

function clearToastTimeout(toastId) {
  if (toastTimeouts.has(toastId)) {
    clearTimeout(toastTimeouts.get(toastId));
    toastTimeouts.delete(toastId);
  }
}

function addToRemoveQueue(toastId, dispatch, delay = DEFAULT_REMOVE_DELAY) {
  clearToastTimeout(toastId);
  const timeout = setTimeout(() => {
    dispatch({ type: actionTypes.REMOVE_TOAST, toastId });
  }, delay);
  toastTimeouts.set(toastId, timeout);
}

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;
      const newToasts = state.toasts.map((t) =>
        toastId === undefined || t.id === toastId ? { ...t, open: false } : t
      );
      if (toastId) {
        addToRemoveQueue(toastId, dispatch, 300); // immediate removal after fade out
      } else {
        newToasts.forEach((t) => addToRemoveQueue(t.id, dispatch, 300));
      }
      return { ...state, toasts: newToasts };
    }
    case actionTypes.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default:
      return state;
  }
}

let memoryState = { toasts: [] };
const listeners = [];

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

const createToast = (props = {}) => {
  const id = genId();
  const { duration = DEFAULT_REMOVE_DELAY, type = "default", ...rest } = props;

  const update = (updateProps) =>
    dispatch({ type: actionTypes.UPDATE_TOAST, toast: { ...updateProps, id } });

  const dismiss = () =>
    dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...rest,
      id,
      type,
      open: true,
      duration,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return { id, update, dismiss };
};

function ToastProvider({ children, position = "bottom-right" }) {
  const [state, setState] = useState(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const idx = listeners.indexOf(setState);
      if (idx > -1) listeners.splice(idx, 1);
      toastTimeouts.forEach((_, id) => clearToastTimeout(id));
    };
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500 w-5 h-5 mr-2" />;
      case "error":
        return <XCircle className="text-red-500 w-5 h-5 mr-2" />;
      case "info":
        return <Info className="text-blue-500 w-5 h-5 mr-2" />;
      case "warning":
        return <AlertTriangle className="text-yellow-500 w-5 h-5 mr-2" />;
      default:
        return null;
    }
  };

  const getToastStyle = (type) => {
    switch (type) {
      case "success":
        return "bg-green-600 text-white";
      case "error":
        return "bg-red-600 text-white";
      case "info":
        return "bg-blue-600 text-white";
      case "warning":
        return "bg-yellow-600 text-black";
      default:
        return "bg-gray-800 text-white";
    }
  };

  return (
    <div>
      <div
        className={`fixed z-50 flex flex-col gap-2 max-w-sm ${
          position === "top-right" ? "top-4 right-4" : "bottom-4 right-4"
        }`}
      >
        {state.toasts.map((t) => (
          <div
            key={t.id}
            className={`p-4 rounded-lg shadow-lg flex items-start justify-between animate-fade ${
              t.open ? "fade-in" : "fade-out"
            } ${getToastStyle(t.type)}`}
          >
            <div className="flex-1 flex items-start gap-2">
              {getIcon(t.type)}
              <div>
                {t.title && <h4 className="font-semibold">{t.title}</h4>}
                {t.description && (
                  <p className="text-sm opacity-90">{t.description}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: t.id })}
              className="ml-4 text-white/60 hover:text-white"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}

function useToast() {
  const toastRef = useRef(createToast);
  const [state, setState] = useState(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const idx = listeners.indexOf(setState);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  return {
    ...state,
    toast: toastRef.current,
    dismiss: (toastId) =>
      dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  };
}

// You can inject this into global styles or Tailwind config
const styles = `
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeOut { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(10px); } }
.fade-in { animation: fadeIn 0.3s ease-out forwards; }
.fade-out { animation: fadeOut 0.3s ease-in forwards; }
`;

export { useToast, ToastProvider, styles };
