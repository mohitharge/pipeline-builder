// draggableNode.js

import './Toolbar.css';

export const DraggableNode = ({ type, label, imgUrl = null }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`draggable-node ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <div className="node-content">
        <img height={14} src={imgUrl ?? '/Assets/node.png'} alt="label_icon" />
        <span>{label}</span>
      </div>
    </div>
  );
};

  