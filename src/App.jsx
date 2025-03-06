import './App.css';
import './output.css';
import {Canvas} from "@react-three/fiber";
import MediaPlayer from './component/mediaPlayer';
import { Suspense, useRef, useState } from 'react';
import { Backdrop, CircularProgress, Alert, AlertTitle } from '@mui/material';
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
  const [error, setError] = useState()

  return (
    <div className="App">
      <audio ref={audioRef} id='audio'>
      </audio>
      <Suspense fallback={Loader}>
        {
                        loading && <Backdrop sx={(theme) => ({ color: '#ce93d8', zIndex: theme.zIndex.drawer + 1 })} open>
                                     <CircularProgress color="inherit" />
                                   </Backdrop>
        }
        {
          error &&  <Alert severity="error" sx={ (theme) =>  ({position: 'absolute', bgcolor:"#ffcdd2", zIndex: theme.zIndex.drawer + 1, margin: "0.5rem"})}>
                      <AlertTitle>Error</AlertTitle>
                      {error}
                    </Alert>
        }
        <Canvas camera={{position: [0,0,10]}}>
            <MediaPlayer audioRef={audioRef} setLoading={setLoading} loading={loading} setError={setError} error={error}/>
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
