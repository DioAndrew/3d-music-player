import './App.css';
import './output.css';
import {Canvas} from "@react-three/fiber";
import MediaPlayer from './component/mediaPlayer';
import { Suspense, useRef } from 'react';
function App() {

  function Loader(){
    return(
      <div className='text-white'>
        <h1>Loading...</h1>
      </div>
    )
  }

  const audioRef = useRef()

  return (
    <div className="App">
      <audio ref={audioRef} id='audio'>
      </audio>
      <Suspense fallback={Loader}>
        <Canvas camera={{position: [0,0,10]}}>
            <MediaPlayer audioRef={audioRef}/>
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
