import React, { useState, useRef, useEffect } from "react";

export function Select({ value, onValueChange, children }) {
  return <div className="relative">{children}</div>;
}

export function SelectTrigger({ children, className = "", onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left border border-gray-300 px-3 py-2 rounded-md bg-white ${className}`}
    >
      {children}
    </button>
  );
}

export function SelectValue({ value, placeholder }) {
  return <span className="text-gray-700">{value || <span className="text-gray-400">{placeholder}</span>}</span>;
}

export function SelectContent({ children, open }) {
  if (!open) return null;
  return (
    <div className="absolute mt-1 w-full border border-gray-300 bg-white rounded-md shadow z-10 max-h-60 overflow-auto">
      {children}
    </div>
  );
}

export function SelectItem({ value, disabled, className = "", children, onSelect }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onSelect(value)}
      className={`block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
