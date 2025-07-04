import { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div style={{maxWidth: '2440px', margin: '0 auto'}}>
      <PipelineToolbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <PipelineUI darkMode={darkMode} />
    </div>
  );
}

export default App;
