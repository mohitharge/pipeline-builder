import React from 'react'
import { Handle } from 'reactflow';

export const AbstractNode = ({
  id,
  title,
  inputFields = [],
  handles = [],
  data,
  onChange,
}) => {
  return (
    <div style={{ width: 220, padding: 10, border: '1px solid black' }}>
      <div style={{ fontWeight: 'bold', marginBottom: 5 }}>{title}</div>
      {handles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={h.position}
          id={h.id || `${id}-${h.key}`}
          style={h.style}
        />
      ))}
      {inputFields.map((field) => (
        <label key={field.key} style={{ display: 'block', marginBottom: 5 }}>
          {field.label}:
          {field.type === 'select' ? (
            <select
              value={data[field.key]}
              onChange={(e) => onChange(field.key, e.target.value)}
            >
              {field.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : field.type === 'text' || field.type === 'number' ? (
            <input
              type={field.type}
              value={data[field.key]}
              onChange={(e) => onChange(field.key, e.target.value)}
            />
          ) : null}
        </label>
      ))}
    </div>
  );
};