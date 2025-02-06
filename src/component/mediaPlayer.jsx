import {Html, OrbitControls} from '@react-three/drei'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faPlay, faPause} from '@fortawesome/free-solid-svg-icons'


const HtmlMusicPlayer = () => {

    const [isPlay, setPlay] = useState(false)
    const [songDuration, setSongDuration] = useState("00:00")
    const [currentSong, setCurrentSong] = useState(0)
    const audioRef = useRef()
    const songSliderRef = useRef()
    const [fullDuration, setFullDuration] = useState()
    const songList = ["audio1.mp3", "audio2.mp3"]

    function audioPlay(){
        audioRef.current.play()
        setPlay(() => true)
    }

    function audioPause(){
        audioRef.current.pause()
        setPlay(() => false)
    }



    function getSongFullDuration(){
        let formatMinute = Math.floor(audioRef.current.duration / 60).toString().padStart(2, "0")
        let formatSecound = Math.floor(audioRef.current.duration % 60).toString().padStart(2, "0")
        setFullDuration(() => `${formatMinute}:${formatSecound}`) 
        songSliderRef.current.setAttribute('max', audioRef.current.duration)
        songSliderRef.current.value = 0
        
    }


    function timeUpdate(){
        let minute = Math.floor(audioRef.current.currentTime / 60)
        let secound = Math.floor(audioRef.current.currentTime % 60)
        let formatMinute = minute.toString().padStart(2, "0")
        let formatSecound = secound.toString().padStart(2, "0")
        setSongDuration(() => `${formatMinute}:${formatSecound}`)
        songSliderRef.current.value = audioRef.current.currentTime
        if(audioRef.current.currentTime === audioRef.current.duration){
           audioPlay()
            }
    }


    useEffect(() => {

        audioRef.current.addEventListener("timeupdate", timeUpdate)
        audioRef.current.addEventListener("loadeddata", getSongFullDuration)
        
        return(
            () => {
                audioRef.current.removeEventListener("timeupdate", timeUpdate)
                audioRef.current.removeEventListener("loadeddata", getSongFullDuration)
            }
        )
            
    }, [])


    useEffect(() => {
        console.log("set song .....  ")
        audioRef.current.src = `./audio/${songList.at(currentSong)}`
        return(() => {
            console.log("Music pause, change song")
            audioPause()
        })
    }, [currentSong])

    function playBtnHandler(){
        isPlay ? audioPause() : audioPlay()
    }

    function seekSong(event){
        audioRef.current.currentTime = event.target.value
    }
    
    function nextSong(){
        setCurrentSong((prev) => (prev + 1) % songList.length)
    }

    function prevSong(){
        console.log(songList.at(-2))
        setCurrentSong((prev) => (prev - 1) % songList.length )
    }

    return(
        <div className='mediaPlayer'>
            <audio ref={audioRef} id='audio'>
            </audio>
            <div className='flex'>
                <h2 className='text-white'>{songDuration}</h2>
                <input ref={songSliderRef} className='m-2' type="range" min={0} onChange={seekSong} name="songSlider" id="songSlider" />
                <h2 className='text-white'>{fullDuration}</h2>
            </div>
            <div className='flex'>
                <button className='controllBtn' onClick={prevSong}>Prev</button>
                <button className='controllBtn' onClick={playBtnHandler}>{isPlay ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}</button>
                <button className='controllBtn' onClick={nextSong}>Next</button>
            </div>
        </div>
    )

}

const PlayerUI = () => {
        return(
            <>
                <group>
                    <Html transform >
                        <HtmlMusicPlayer />
                    </Html>
                </group>

                <OrbitControls />
                <ambientLight intensity={1} />
            </>
        )
}

export default PlayerUI