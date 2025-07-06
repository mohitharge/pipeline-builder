import React, { useCallback, useState, useRef } from 'react';
import { Handle, useReactFlow } from 'reactflow';
import './AbstractNode.css';

export const AbstractNode = ({
  id,
  title,
  icon = null,
  inputFields = [],
  handles = [],
  data,
  onChange,
  onVarRemove = null
}) => {
  const { setNodes } = useReactFlow();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [hovering, setHovering] = useState(false);
  const processingRemoval = useRef(new Set());

  const deleteNode = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
    } else {
      setNodes((nodes) => nodes.filter((n) => n.id !== id));
    }
  };

  const handleRemove = useCallback(
    (varName) => (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Prevent double execution
      if (processingRemoval.current.has(varName)) {
        return;
      }
      
      processingRemoval.current.add(varName);
      console.log("lg1 maincall", varName);
      onVarRemove?.(varName);
      
      // Clear the flag after a short delay
      setTimeout(() => {
        processingRemoval.current.delete(varName);
      }, 100);
    },
    [onVarRemove]
  );

  const renderField = (field) => {
    const value = data[field.key];

    switch (field.type) {
      case 'select':
        return (
          <select name={`${field.key}-${id}`} id={id} value={value} onChange={(e) => onChange(field.key, e.target.value)}>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            id={id}
            name={`${field.key}-${id}`}
            onChange={(e) => onChange(field.key, e.target.value, e)}
            rows={3}
          />
        );

      case 'radio':
        return (
          <div className="radio-group">
            {field.options.map((opt) => (
              <label key={opt}>
                <input
                  type="radio"
                  id={id}
                  name={`${field.key}-${id}`}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => onChange(field.key, e.target.value)}
                />
                {opt}
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="checkbox-group">
            {field.options.map((opt) => (
              <label key={opt}>
                <input
                  type="checkbox"
                  id={id}
                  name={`${field.key}-${id}`}
                  checked={value?.includes(opt)}
                  onChange={(e) => {
                    const current = value || [];
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
        );

      case 'toggle':
        return (
          <label className="toggle-wrapper">
            <input
              type="checkbox"
              id={id}
              name={`${field.key}-${id}`}
              checked={!!value}
              onChange={(e) => onChange(field.key, e.target.checked)}
            />
            <span>{value ? 'Yes' : 'No'}</span>
          </label>
        );

      default:
        return (
          <input
            type={field.type}
            id={id}
            name={`${field.key}-${id}`}
            value={value}
            onChange={(e) => onChange(field.key, e.target.value)}
          />
        );
    }
  };

  return (
    <div className="abstract-node">
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

      <div className="abstract-node-header">
        <div className="abstract-node-title">
          <img src={icon ?? "/Assets/node.png"} alt={`${title}-icon`} />
          <span>{title}</span>
        </div>

        <div
          className="abstract-node-delete-wrapper"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => {
            setHovering(false);
            setConfirmDelete(false);
          }}
        >
          <div className={`abstract-node-tooltip ${hovering ? 'visible' : ''}`}>
            {confirmDelete ? 'Confirm delete' : 'Delete node'}
          </div>
          <button
            onClick={deleteNode}
            className={`abstract-node-delete ${confirmDelete ? 'confirm' : ''}`}
          >
            ×
          </button>
        </div>
      </div>

      <div className="abstract-node-fields">
        {inputFields.map((field) => (
          <label key={field.key} className="field-wrapper">
            {/* Selected Variables Pills */}
            {field.key === 'text' && (
              <div
                className={`selected-vars-container ${
                  data.selectedVars?.length > 0 ? 'visible' : ''
                }`}
              >
                {data.selectedVars.map((variable) => (
                  <span key={variable} className="var-pill">
                    {variable}
                    <button
                      onClick={handleRemove(variable)}
                      className="remove-button"
                      type="button"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            {renderField(field)}
          </label>
        ))}
      </div>
    </div>
  );
};
