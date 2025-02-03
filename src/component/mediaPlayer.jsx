import {Html, OrbitControls} from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faPlay, faPause} from '@fortawesome/free-solid-svg-icons'


const HtmlMusicPlayer = () => {

    const [isPlay, setPlay] = useState(false)
    const [songDuration, setSongDuration] = useState("00:00")
    const [currentSong, setCurrentSong] = useState(0)
    const audioRef = useRef()
    const songSliderRef = useRef()
    const [fullDuration, setFullDuration] = useState("00:00")
    const songList = ["audio1.mp3", "audio2.mp3"]

    // function playPause(){
    //     console.log(`Is music play: ${isPlay}`)
    //     isPlay ? audioRef.current.play() : audioRef.current.pause()
    // }
    
    function audioPlay(){
        audioRef.current.play()
        setPlay(() => true)
    }

    function audioPause(){
        audioRef.current.pause()
        setPlay(() => false)
    }



    function getSongFullDuration(){
        let formatMinute = Math.floor(audioRef.current.duration / 60)
        let formatSecound = Math.floor(audioRef.current.duration % 60)
        if(formatMinute < 10){
            formatMinute =  `0${formatMinute}`
            }
        if(formatSecound < 10){
            formatSecound = `0${formatSecound}`
            }
        return `${formatMinute}:${formatSecound}`
    }

    useEffect(() => {
            setInterval(() => {
                let minute = Math.floor(audioRef.current.currentTime / 60)
                let secound = Math.floor(audioRef.current.currentTime % 60)
                let formatMinute = minute
                let formatSecound = secound
                if(minute < 10){
                    formatMinute =  `0${minute}`
                }
                if(secound < 10){
                    formatSecound = `0${secound}`
                }
                setSongDuration(() => `${formatMinute}:${formatSecound}`)
                songSliderRef.current.value = audioRef.current.currentTime
                if(audioRef.current.currentTime === audioRef.current.duration){
                   audioPlay()
                }
            }, 1000)
            
    }, [isPlay])

    useEffect(() => {
        songSliderRef.current.setAttribute('max', audioRef.current.duration)
        setFullDuration(getSongFullDuration)
    })

    useEffect(() => {
        console.log("set song .....  ")
        audioRef.current.src = `./audio/${songList[currentSong]}`
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
        setCurrentSong((prev) => prev + 1)
    }

    function prevSong(){
        setCurrentSong((prev) => prev - 1)
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