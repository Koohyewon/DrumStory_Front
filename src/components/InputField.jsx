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
    <div className="flex flex-col gap-1.5 mb-7 w-1/2 max-w-[550px]">
      <label className="font-bold text-[17px]">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border px-3 py-4.5 rounded-md text-xl focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
    </div>
  );
}
