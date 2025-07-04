// toolbar.js

import { useEffect, useRef, useState } from 'react';
import { DraggableNode } from './draggableNode';
import './Toolbar.css';

const primaryNodes = [
  { imgUrl: '/Assets/input.png', type: 'customInput', label: 'Input' },
  { imgUrl: '/Assets/text.png', type: 'text', label: 'Text' },
  { imgUrl: '/Assets/chatgpt.png', type: 'llm', label: 'LLM' },
  { imgUrl: '/Assets/output.png', type: 'customOutput', label: 'Output' },
];

const demoNodes = [
  { imgUrl: '/Assets/node.png', type: 'ConditionNode', label: 'Condition' },
  { imgUrl: '/Assets/node.png', type: 'ConfigNode', label: 'Config' },
  { imgUrl: '/Assets/node.png', type: 'APICallNode', label: 'API Call' },
  { imgUrl: '/Assets/node.png', type: 'CommentNode', label: 'Comment' },
  { imgUrl: '/Assets/node.png', type: 'SurveyNode', label: 'Survey' },
];

export const PipelineToolbar = ({darkMode, setDarkMode}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowDropdown(false);
      }
    };

    const handleDragEnd = () => {
      setShowDropdown(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('dragend', handleDragEnd);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('dragend', handleDragEnd);
    };
  }, []);

  return (
    <div className="toolbar-container">
      {/* Logo */}
      <div className="toolbar-logo">
        <img src="/Assets/logo.png" alt="Logo" height={25} />
        <span className="logo-text">Pipeline Builder</span>
      </div>
      {/* Right side nodes */}
      <div className="toolbar-right">
        <div className="toolbar-group">
          {primaryNodes.map((node) => (
            <DraggableNode key={node.type} {...node} />
          ))}
        </div>

        <div className="toolbar-dropdown" ref={dropdownRef}>
          <button className="dropdown-button" onClick={() => setShowDropdown((prev) => !prev)}>
            <img src="/Assets/node.png" alt="button" height={14} /> <span>Demo Nodes</span>
          </button>

          <div className={`dropdown-menu ${showDropdown ? 'open' : ''}`}>
            {demoNodes.map((node) => (
              <DraggableNode key={node.type} {...node} />
            ))}
          </div>
        </div>
        <button className="icon-toggle" onClick={() => setDarkMode((prev) => !prev)}>
          <img
            src="/Assets/sun.png"
            alt="Light mode"
            className={`icon-image sun-icon ${darkMode ? 'hide' : 'show'}`}
            height="26"
          />
          <img
            src="/Assets/moon.png"
            alt="Dark mode"
            className={`icon-image moon-icon ${darkMode ? 'show' : 'hide'}`}
            height="22"
          />
        </button>
      </div>
    </div>
  );
};
