// ActionButtons.js
import { useState } from 'react';
import './ActionButtons.css';

export const ActionButtons = ({ nodes, edges, reactFlowInstance }) => {
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState({ nodes: [], edges: [] });
  const [showActions, setShowActions] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const isSameGraph = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  const showToast = (type, message, timeout = 1500) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), timeout);
  };

  const handleSave = () => {
    if (toast) return;
    if (!nodes.length && !edges.length) {
      showToast('warning', '⚠️ Nothing to save.\nPlease build your flow first.');
      return;
    }
      // Get the current viewport from React Flow
    const viewport = reactFlowInstance.getViewport();

    localStorage.setItem('flow:nodes', JSON.stringify(nodes));
    localStorage.setItem('flow:edges', JSON.stringify(edges));
    localStorage.setItem('flow:viewport', JSON.stringify(viewport));
    showToast('success', '✅ Flow saved to local storage.');
  };

  const handleReset = () => {
    if (toast) return;

    const savedNodes = JSON.parse(localStorage.getItem('flow:nodes') || '[]');
    const savedEdges = JSON.parse(localStorage.getItem('flow:edges') || '[]');

    if (savedNodes.length || savedEdges.length) {
      localStorage.removeItem('flow:edges');
      localStorage.removeItem('flow:nodes');
      localStorage.removeItem('flow:viewport');
      showToast('warning', '🗑️ Flow deleted from local storage.');
    } else{
      showToast('warning', '⚠️ Nothing to delete in local storage.');
    }
  }

  const handleSubmit = async () => {
    if (toast || loading) return;
    if (!nodes.length && !edges.length) {
      showToast('warning', '⚠️ No nodes or edges to submit.\nPlease build your flow before submitting.');
      return;
    }

    if (isSameGraph(nodes, lastSubmitted.nodes) && isSameGraph(edges, lastSubmitted.edges)) {
      showToast('warning', '⚠️ No changes detected.\nPlease update the flow before submitting.');
      return;
    }

    setLoading(true);
    setToast(null);

    try {
      const response = await fetch('https://pipeline-builder-api.onrender.com/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      const res = await response.json();

      if (res.success) {
        const result = res.data;

        setTimeout(() => {
          showToast('success', `${res.message}!\n• Nodes: ${result.num_nodes}\n• Edges: ${result.num_edges}\n• DAG Valid: ${result.is_dag ? 'Yes ✅' : 'No ❌'}`, 5000);
        }, 200);

        setLastSubmitted({ nodes, edges });

      } else {
        setTimeout(() => {
          showToast('warning', `⚠️ ${res.message || 'Submission failed due to invalid input.'}`, 4000);
        }, 200);
      }

    } catch (err) {
      showToast('error', `❌ Submission failed.\nPlease check your backend server or network.`, 3000);
    } finally {
      setLoading(false)
    }

  };

  const handleExportJSON = () => {
    if (toast) return;
    if (!nodes.length && !edges.length) {
      showToast('warning', '⚠️ Nothing to export.\nPlease build your flow first.');
      return;
    }
    setIsExporting(true);

    const flowData = {
      nodes,
      edges,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const dataStr = JSON.stringify(flowData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');

    setTimeout(() => {
      link.href = url;
      link.download = `flow-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsExporting(false);
      showToast('success', '📁 JSON exported successfully!');
    }, 300);
  };

  const toggleActions = () => {
    setShowActions(!showActions);
  };

  return (
    <>
      <div className="submit-button-container">
        <button disabled={toast || loading} className="submit-button" onClick={handleSubmit}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        <div className="action-toggle-wrapper">
          <button disabled={toast} className="action-toggle-button" onClick={toggleActions}>
            <span className={`toggle-icon ${showActions ? 'rotated' : ''}`}>{showActions ? '×' : '☰'}</span>
          </button>

          <div className={`action-buttons-group ${showActions ? 'show' : ''}`}>
            <button disabled={toast} className="action-button save-button" onClick={handleSave}>
              💾 Save
            </button>
            <button disabled={toast || isExporting} className="action-button export-button" onClick={handleExportJSON}>
              {isExporting ? (
                <div className="spinner-container">
                  <svg className="spinner" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle className="spinner-bg" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
                    <circle className="spinner-fg" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="15.708 47.124" strokeLinecap="round" />
                  </svg>
                  Exporting...
                </div>
              ) : (
                "📤 Export JSON"
              )}
            </button>
            <button disabled={toast} className="action-button reset-button" onClick={handleReset}>
              ⚠️ Reset
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <div className={`submit-toast ${toast.type}`} role="alert">
          <button className="close-toast" onClick={() => setToast(null)} aria-label="Close toast">
            &times;
          </button>
          <span dangerouslySetInnerHTML={{ __html: toast.message.replace(/\n/g, '<br />') }} />
        </div>
      )}
    </>
  );
};