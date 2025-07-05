import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';

function App() {
  return (
    <div style={{maxWidth: '2440px', margin: '0 auto'}}>
      <PipelineToolbar />
      <PipelineUI />
    </div>
  );
}

export default App;
