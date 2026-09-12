"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isSearching: boolean;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_SIZE = 1 * 1024 * 1024; // 1MB

export function UploadZone({ onFileSelect, isSearching }: UploadZoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!ACCEPTED_TYPES.includes(file.type.toLowerCase())) {
      return "Please upload a JPEG or PNG image";
    }

    // Check file size
    if (file.size > MAX_SIZE) {
      return `Image too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Max size is 1MB.`;
    }

    return null;
  };

  const handleFile = useCallback(
    (file: File) => {
      setError(null);

      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        setPreview(null);
        if (inputRef.current) inputRef.current.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onFileSelect(file);
    },
    [onFileSelect],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div
        className={cn(
          "relative w-full aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group",
          "border-2 border-dashed",
          isDragging ? "border-primary bg-primary/5" : "border-outline",
          error ? "border-error/50" : "",
          preview && "border-solid border-outline-variant",
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          className="hidden"
          onChange={handleChange}
        />

        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            {/* Scanning line animation */}
            {isSearching && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent shadow-[0_0_20px_rgba(93,230,255,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
              </div>
            )}
            {/* Change image overlay */}
            <div className="absolute inset-0 bg-surface/60 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Upload className="w-8 h-8 text-primary mb-2" />
              <span className="text-on-surface font-medium">
                Click to change
              </span>
            </div>
            {/* Clear button */}
            <button
              onClick={handleClear}
              className="absolute top-3 right-3 p-2 bg-surface/80 backdrop-blur-md rounded-full text-on-surface hover:text-error transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <Upload
              className={cn(
                "w-16 h-16 mb-4 group-hover:scale-110 transition-transform",
                error ? "text-error" : "text-primary",
              )}
            />
            <h3 className="text-lg font-semibold text-on-surface mb-1">
              Drag & Drop Image
            </h3>
            <p className="text-sm text-on-surface-variant">
              or click to browse from your device
            </p>
            <div className="flex gap-2 mt-4">
              <span className="px-3 py-1 bg-surface-container text-xs text-on-surface-variant rounded-full">
                JPEG
              </span>
              <span className="px-3 py-1 bg-surface-container text-xs text-on-surface-variant rounded-full">
                JPG
              </span>
              <span className="px-3 py-1 bg-surface-container text-xs text-on-surface-variant rounded-full">
                PNG
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-2 opacity-70">
              Max size: 1MB
            </p>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-start gap-2 p-3 bg-error-container/20 border border-error/30 rounded-lg">
          <AlertCircle className="w-4 h-4 text-error flex-shrink-0 mt-0.5" />
          <p className="text-sm text-error">{error}</p>
        </div>
      )}
    </div>
  );
}
