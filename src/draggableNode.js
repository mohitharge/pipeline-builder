// draggableNode.js

import './Toolbar.css';

export const DraggableNode = ({ type, label, imgUrl = null }) => {
  const handleDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleTouchStart = (event, nodeType) => {
    event.target.classList.add('drag-touch');
    const dragEvent = new CustomEvent('touchdragstart', {
      detail: { nodeType },
    });
    window.dispatchEvent(dragEvent);
  };

  return (
    <div
      className={`draggable-node ${type}`}
      draggable
      onDragStart={(event) => handleDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      onTouchStart={(e) => handleTouchStart(e, type)}
    >
      <div className="node-content">
        <img height={14} src={imgUrl ?? '/Assets/node.png'} alt="label_icon" />
        <span>{label}</span>
      </div>
    </div>
  );
};
