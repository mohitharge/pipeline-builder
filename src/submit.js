// submit.js
import { useState } from 'react';
import './SubmitButton.css';

export const SubmitButton = ({ nodes, edges }) => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [lastSubmitted, setLastSubmitted] = useState({ nodes: [], edges: [] });

  const isSameGraph = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  const handleSubmit = async () => {
    if (toast) return
    if (!nodes.length && !edges.length) {
      setToast({
        type: 'warning',
        message: '⚠️ No nodes or edges to submit.\nPlease build your flow before submitting.',
      });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    const hasSameNodes = isSameGraph(nodes, lastSubmitted.nodes);
    const hasSameEdges = isSameGraph(edges, lastSubmitted.edges);

    if (hasSameNodes && hasSameEdges) {
      setToast({
        type: 'warning',
        message: '⚠️ No changes detected.\nPlease update the flow before submitting.',
      });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setLoading(true);
    setToast(null);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      const result = await response.json();

      setTimeout(() => {
        setToast({
          type: 'success',
          message: `Flow submitted successfully!\n• Nodes: ${result.num_nodes}\n• Edges: ${result.num_edges}\n• DAG Valid: ${result.is_dag ? 'Yes ✅' : 'No ❌'}`,
        });
      }, 200);

      setLastSubmitted({ nodes, edges });
      setTimeout(() => setToast(null), 9000);
    } catch (err) {
      setToast({
        type: 'error',
        message: `⚠️ Submission failed.\nPlease check your backend server or network.`,
      });
      setTimeout(() => setToast(null), 5000);
    } finally {
      setTimeout(() => setLoading(false), 200);
    }
  };

  return (
    <>
      <div className="submit-button-container">
        <button
          type="submit"
          onClick={handleSubmit}
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      {toast && (
        <div className={`submit-toast ${toast.type}`} role="alert">
          <button
            className="close-toast"
            onClick={() => setToast(null)}
            aria-label="Close toast"
          >
            &times;
          </button>
          <span
            dangerouslySetInnerHTML={{
              __html: toast.message.replace(/\n/g, '<br />'),
            }}
          />
        </div>
      )}
    </>
  );
};
