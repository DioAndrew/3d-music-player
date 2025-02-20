import './App.css';
import './output.css';
import {Canvas} from "@react-three/fiber";
import MediaPlayer from './component/mediaPlayer';
import { Suspense, useRef, useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
function App() {

  function Loader(){
    return(
      <div className='text-white'>
        <h1>Loading...</h1>
      </div>
    )
  }

  const audioRef = useRef()
  const [loading, setLoading] = useState()

  return (
    <div className="App">
      <audio ref={audioRef} id='audio'>
      </audio>
      <Suspense fallback={Loader}>
        {
                        loading ?<Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open>
                        <CircularProgress color="inherit" />
                        </Backdrop> : null
        }
        <Canvas camera={{position: [0,0,10]}}>
            <MediaPlayer audioRef={audioRef} setLoading={setLoading}/>
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
