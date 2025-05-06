import React, { useState } from "react";

export function Tabs({ defaultValue, onValueChange, children }) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue) => {
    setValue(newValue);
    onValueChange?.(newValue);
  };

  const tabsList = React.Children.toArray(children).find(
    (child) => child.type.displayName === "TabsList"
  );
  const content = React.Children.toArray(children).filter(
    (child) => child.props.value === value
  );

  return (
    <div>
      {React.cloneElement(tabsList, { value, onValueChange: handleChange })}
      {content}
    </div>
  );
}

export function TabsList({ children, value, onValueChange, className = "" }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          isActive: value === child.props.value,
          onClick: () => onValueChange(child.props.value),
        })
      )}
    </div>
  );
}
TabsList.displayName = "TabsList";

export function TabsTrigger({ children, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-medium ${
        isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children }) {
  return <div className="mt-4">{children}</div>;
}
