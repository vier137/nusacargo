"use client";

import { useEffect, useRef, type RefObject } from "react";
import { Button } from "./button";

export interface ConfirmDialogProps {
  open: boolean;
  danger?: boolean;
  triggerRef?: RefObject<HTMLButtonElement | null>;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmDialog({
  open,
  danger = false,
  triggerRef,
  title,
  description,
  confirmLabel = "Konfirmasi",
  cancelLabel = "Batal",
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      if (triggerRef?.current) {
        triggerRef.current.focus();
      }
      return;
    }

    // Auto-focus confirm/cancel button
    const timer = setTimeout(() => {
      confirmButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onCancel, triggerRef]);

  if (!open) return null;

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl"
      >
        <div className="space-y-2">
          <h2 id="dialog-title" className="text-base font-bold text-slate-900">
            {title}
          </h2>
          <p id="dialog-description" className="text-sm text-slate-600">
            {description}
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" size="md" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            ref={confirmButtonRef}
            variant={danger ? "danger" : "primary"}
            size="md"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
