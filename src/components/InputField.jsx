import React from "react";

export default function InputField({
  label,
  placeholder,
  value,
  onChange,
  name,
  type = "text",
}) {
  return (
    <div className="flex flex-col gap-1 mb-6 w-3/7 max-w-[550px]">
      <label className="font-bold text-base">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border px-3 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
    </div>
  );
}
