import React, { useState } from 'react';
import { Handle, useReactFlow } from 'reactflow';

export const AbstractNode = ({
  id,
  title,
  icon = null,
  inputFields = [],
  handles = [],
  data,
  onChange,
}) => {

  const { setNodes } = useReactFlow();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [hovering, setHovering] = useState(false);

  const deleteNode = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
    } else {
      setNodes((nodes) => nodes.filter((n) => n.id !== id));
    }
  };

  return (
    <div
      style={{
        width: 260,
        padding: 12,
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        fontFamily: 'Inter, sans-serif',
        fontSize: 13,
        color: '#111827',
        position: 'relative',
      }}
    >
      {handles.map((h, i) => (
        <Handle
          key={i}
          type={h.type}
          position={h.position}
          id={h.id || `${id}-${h.key}`}
          style={{
            ...h.style,
            width: 8,
            height: 8,
            background: '#6366f1',
          }}
        />
      ))}
      <div
        style={{
          background: '#f3f4f6',
          padding: '6px 10px',
          borderRadius: 6,
          fontWeight: 600,
          fontSize: 14,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%"}}>
          <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
            <img style={{height:"14px"}} src={icon ?? "/Assets/default.png"} alt={`${title}-icon`} /> 
            <span>{title}</span>
          </div>
          <div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => {
              setHovering(false);
              setConfirmDelete(false);
            }}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                position: 'absolute',
                top: -28,
                right: -28,
                background: '#333',
                color: '#fff',
                fontSize: 11,
                padding: '4px 6px',
                borderRadius: 4,
                whiteSpace: 'nowrap',
                zIndex: 10,
                opacity: hovering ? 1 : 0,
                transform: `translateY(${hovering ? '0px' : '5px'})`,
                pointerEvents: 'none',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
            >
              {confirmDelete ? 'Confirm delete' : 'Delete node'}
            </div>
            <button
              onClick={deleteNode}
              style={{
                background: confirmDelete ? '#fee2e2' : '#d7d7d7',
                border: 'none',
                color: confirmDelete ? '#b91c1c' : '#3e3e3e',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: 14,
                borderRadius: 4,
                padding: '0 6px',
                transition: 'background 0.2s ease',
              }}
            >
              ×
            </button>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {inputFields.map((field) => (
          <label
            key={field.key}
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 12,
              marginTop: 10,
              fontWeight: 500,
              gap: 5,
            }}
          >
            <span>{field.label}</span>

            {field.type === 'select' ? (
              <select
                value={data[field.key]}
                onChange={(e) => onChange(field.key, e.target.value)}
                style={{
                  padding: '6px 8px',
                  border: '1px solid #d1d5db',
                  borderRadius: 6,
                  fontSize: 13,
                }}
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                value={data[field.key]}
                onChange={(e) => onChange(field.key, e.target.value)}
                rows={3}
                style={{
                  padding: '6px 8px',
                  border: '1px solid #d1d5db',
                  borderRadius: 6,
                  fontSize: 13,
                  resize: 'none',
                  fieldSizing: "content"
                }}
              />
            ) : field.type === 'radio' ? (
              <div style={{ display: 'flex', gap: 10 }}>
                {field.options.map((opt) => (
                  <label key={opt} style={{ fontWeight: 400 }}>
                    <input
                      type="radio"
                      name={`${field.key}-${id}`}
                      value={opt}
                      checked={data[field.key] === opt}
                      onChange={(e) => onChange(field.key, e.target.value)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ) : field.type === 'checkbox' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {field.options.map((opt) => (
                  <label key={opt}>
                    <input
                      type="checkbox"
                      checked={data[field.key]?.includes(opt)}
                      onChange={(e) => {
                        const current = data[field.key] || [];
                        if (e.target.checked) {
                          onChange(field.key, [...current, opt]);
                        } else {
                          onChange(field.key, current.filter((v) => v !== opt));
                        }
                      }}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ) : field.type === 'toggle' ? (
              <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input
                  type="checkbox"
                  checked={!!data[field.key]}
                  onChange={(e) => onChange(field.key, e.target.checked)}
                />
                <span>{data[field.key] ? 'Yes' : 'No'}</span>
              </label>
            ) : (
              <input
                type={field.type}
                value={data[field.key]}
                onChange={(e) => onChange(field.key, e.target.value)}
                style={{
                  padding: '6px 8px',
                  border: '1px solid #d1d5db',
                  borderRadius: 6,
                  fontSize: 13,
                }}
              />
            )}
          </label>
        ))}

      </div>
    </div>
  );
};