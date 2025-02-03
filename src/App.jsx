import './App.css';
import './output.css';
import {Canvas} from "@react-three/fiber";
import MediaPlayer from './component/mediaPlayer';
import { Suspense } from 'react';
function App() {

  function Loader(){
    return(
      <div className='text-white'>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div className="App">
      <Suspense fallback={Loader}>
        <Canvas>
            <MediaPlayer />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
