// toolbar.js

import { useEffect, useRef, useState } from 'react';
import { DraggableNode } from './draggableNode';
import './Toolbar.css';
import { useThemeStore } from './store';

export const isDesktop = window.matchMedia('(min-width: 769px)').matches;

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

export const PipelineToolbar = () => {
  const { darkMode, toggleDarkMode } = useThemeStore();
  const [showDropdown, setShowDropdown] = useState({ primary: false, demo: false });

  const demoRef = useRef(null);
  const primaryRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (demoRef.current && !demoRef.current.contains(event.target)) {
        setShowDropdown(prev => ({ ...prev, demo: false }));
      }
      if (primaryRef.current && !primaryRef.current.contains(event.target)) {
        setShowDropdown(prev => ({ ...prev, primary: false }));
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowDropdown({ primary: false, demo: false });
      }
    };

    const handleDragEnd = () => {
      setShowDropdown({ primary: false, demo: false });
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
    <div id="toolbar" className="toolbar-container">
      {/* Logo */}
      <div className="toolbar-logo">
        <img src="/Assets/logo.png" alt="Logo" height={25} />
        <span className="logo-text">Pipeline Builder</span>
      </div>

      {/* Right Side */}
      <div className="toolbar-right">
        {isDesktop ? (
          <div className="toolbar-group">
            {primaryNodes.map((node) => (
              <DraggableNode key={node.type} {...node} />
            ))}
          </div>
        ) : (
          <div className="toolbar-dropdown" ref={primaryRef}>
            <button
              className="dropdown-button"
              onClick={() =>
                setShowDropdown((prev) => ({
                  ...prev,
                  primary: !prev.primary,
                  demo: false,
                }))
              }
            >
              <img src="/Assets/node.png" alt="button" height={14} />
              <span>Primary Nodes</span>
            </button>
            <div className={`dropdown-menu ${showDropdown.primary ? 'open' : ''}`}>
              {primaryNodes.map((node) => (
                <DraggableNode key={node.type} {...node} />
              ))}
            </div>
          </div>
        )}

        {/* Demo Dropdown */}
        <div className="toolbar-dropdown" ref={demoRef}>
          <button
            className="dropdown-button"
            onClick={() =>
              setShowDropdown((prev) => ({
                ...prev,
                demo: !prev.demo,
                primary: false,
              }))
            }
          >
            <img src="/Assets/node.png" alt="button" height={14} />
            <span>Demo Nodes</span>
          </button>
          <div className={`dropdown-menu ${showDropdown.demo ? 'open' : ''}`}>
            {demoNodes.map((node) => (
              <DraggableNode key={node.type} {...node} />
            ))}
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <button className="icon-toggle" onClick={toggleDarkMode}>
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
