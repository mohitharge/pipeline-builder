// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '80px', 
          height: '40px',
          display: 'flex', 
          padding: '0 15px',
          alignItems: 'center', 
          borderRadius: '8px',
          backgroundColor: '#1C2536',
          justifyContent: 'center', 
          flexDirection: 'column',
          boxSizing: 'border-box'
        }} 
        draggable
      >
          <span style={{ color: '#fff' }}>{label}</span>
      </div>
    );
  };
  