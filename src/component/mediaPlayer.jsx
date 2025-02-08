import {Html, OrbitControls} from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faPlay, faPause, faForwardStep, faBackwardStep} from '@fortawesome/free-solid-svg-icons'
import { useFrame } from '@react-three/fiber'
import random from "random"

const PlayPauseBtn = (props) => {
    return(
        <button className='controllBtn' onClick={props.playBtnHandler}>{props.isPlay ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}</button>
    )
}
const NextSong = (props) => {
    return(
        <button className='controllBtn' onClick={props.nextSong}><FontAwesomeIcon icon={faForwardStep} /></button>
    )
}
const PrevSong = (props) => {
    return(
        <button className='controllBtn' onClick={props.prevSong}><FontAwesomeIcon icon={faBackwardStep} /></button>
    )
}

const MediaPlayer = (props) => {
    return(
        <div className='mediaPlayer'>
            <div className='flex'>
                <h2 className='text-white'>{props.songDuration}</h2>
                <input ref={props.songSliderRef} className='m-2' type="range" min={0} onChange={props.seekSong} name="songSlider" id="songSlider" />
                <h2 className='text-white'>{props.fullDuration}</h2>
            </div>
        </div>
    )
}

const SongImage = () => {
    return(
        <img className='songImage' src="./image/no_image.png" alt="no_image.png" />
    )
}

const BoxBackground = (props) => {
        const position = []
        const box = []
        let i = 0
        for(let y = -10; y <= 15; y += 4){
            for(let x = -30; x <= 30; x += 4){
                position.push([x,y,-1])
            }
        }
        for(let z = 0; z <= 30; z += 4){
            for(let x = -30; x <= 30; x += 4){
                position.push([x,-12, z])
            }
        }
        position.map((pos, index) => {
            box.push(
                <mesh key={i} position={pos} ref={(el) => props.boxRef.current[index] = el}>
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh>
            )
        })
    return box
}

// const HtmlMusicPlayer = () => {

//     const [isPlay, setPlay] = useState(false)
//     const [songDuration, setSongDuration] = useState("00:00")
//     const [currentSong, setCurrentSong] = useState(0)
//     const audioRef = useRef()
//     const songSliderRef = useRef()
//     const [fullDuration, setFullDuration] = useState()
//     const songList = ["audio1.mp3", "audio2.mp3"]

//     function audioPlay(){
//         props.audioRef.current.play()
//         setPlay(() => true)
//     }

//     function audioPause(){
//         props.audioRef.current.pause()
//         setPlay(() => false)
//     }



//     function getSongFullDuration(){
//         let formatMinute = Math.floor(props.audioRef.current.duration / 60).toString().padStart(2, "0")
//         let formatSecound = Math.floor(props.audioRef.current.duration % 60).toString().padStart(2, "0")
//         setFullDuration(() => `${formatMinute}:${formatSecound}`) 
//         songSliderRef.current.setAttribute('max', props.audioRef.current.duration)
//         songSliderRef.current.value = 0
        
//     }


//     function timeUpdate(){
//         let minute = Math.floor(props.audioRef.current.currentTime / 60)
//         let secound = Math.floor(props.audioRef.current.currentTime % 60)
//         let formatMinute = minute.toString().padStart(2, "0")
//         let formatSecound = secound.toString().padStart(2, "0")
//         setSongDuration(() => `${formatMinute}:${formatSecound}`)
//         songSliderRef.current.value = props.audioRef.current.currentTime
//         if(props.audioRef.current.currentTime === props.audioRef.current.duration){
//            audioPlay()
//             }
//     }


//     useEffect(() => {

//         props.audioRef.current.addEventListener("timeupdate", timeUpdate)
//         props.audioRef.current.addEventListener("loadeddata", getSongFullDuration)
        
//         return(
//             () => {
//                 props.audioRef.current.removeEventListener("timeupdate", timeUpdate)
//                 props.audioRef.current.removeEventListener("loadeddata", getSongFullDuration)
//             }
//         )
            
//     }, [])


//     useEffect(() => {
//         console.log("set song .....  ")
//         props.audioRef.current.src = `./audio/${songList.at(currentSong)}`
//         return(() => {
//             console.log("Music pause, change song")
//             audioPause()
//         })
//     }, [currentSong])

//     function playBtnHandler(){
//         isPlay ? audioPause() : audioPlay()
//     }

//     function seekSong(event){
//         props.audioRef.current.currentTime = event.target.value
//     }
    
//     function nextSong(){
//         setCurrentSong((prev) => (prev + 1) % songList.length)
//     }

//     function prevSong(){
//         console.log(songList.at(-2))
//         setCurrentSong((prev) => (prev - 1) % songList.length )
//     }

//     return(
//         <div className='mediaPlayer'>
//             <audio ref={props.audioRef} id='audio'>
//             </audio>
//             <div className='flex'>
//                 <h2 className='text-white'>{songDuration}</h2>
//                 <input ref={songSliderRef} className='m-2' type="range" min={0} onChange={seekSong} name="songSlider" id="songSlider" />
//                 <h2 className='text-white'>{fullDuration}</h2>
//             </div>
//             <div className='flex'>
//                 {/* <button className='controllBtn' onClick={prevSong}>Prev</button> */}
//                 {/* <PlayPauseBtn playBtnHandler={playBtnHandler} isPlay={isPlay}/> */}
//                 {/* <button className='controllBtn' onClick={nextSong}>Next</button> */}
//             </div>
//         </div>
//     )

// }


const PlayerUI = (props) => {


    const [isPlay, setPlay] = useState(false)
    const [songDuration, setSongDuration] = useState("00:00")
    const [currentSong, setCurrentSong] = useState(0)
    
    const songSliderRef = useRef()
    const [fullDuration, setFullDuration] = useState()
    const songList = ["audio1.mp3", "audio2.mp3"]


    const boxRef = useRef([])

    const boxColor = [0x7e1891, 0xe73879, 0xf26b0f, 0xfcc737, 0x2973b2, 0x48a6a7, 0x9acbd0, 0xf2efe7, 0xdad2ff, 0xb2a5ff, 0x71c9ce, 0xa6e3e9, 0xcbf1f5, 0xe3fdfd, 0xdd88cf]

    function audioPlay(){
        props.audioRef.current.play()
        setPlay(() => true)
    }

    function audioPause(){
        props.audioRef.current.pause()
        setPlay(() => false)
    }



    function getSongFullDuration(){
        let formatMinute = Math.floor(props.audioRef.current.duration / 60).toString().padStart(2, "0")
        let formatSecound = Math.floor(props.audioRef.current.duration % 60).toString().padStart(2, "0")
        setFullDuration(() => `${formatMinute}:${formatSecound}`) 
        songSliderRef.current.setAttribute('max', props.audioRef.current.duration)
        songSliderRef.current.value = 0
        
    }


    function timeUpdate(){
        let minute = Math.floor(props.audioRef.current.currentTime / 60)
        let secound = Math.floor(props.audioRef.current.currentTime % 60)
        let formatMinute = minute.toString().padStart(2, "0")
        let formatSecound = secound.toString().padStart(2, "0")
        setSongDuration(() => `${formatMinute}:${formatSecound}`)
        songSliderRef.current.value = props.audioRef.current.currentTime
        if(props.audioRef.current.currentTime === props.audioRef.current.duration){
           audioPlay()
            }
    }


    useEffect(() => {

        props.audioRef.current.addEventListener("timeupdate", timeUpdate)
        props.audioRef.current.addEventListener("loadeddata", getSongFullDuration)
        
        boxRef.current.map((el) => {
            el.material.color.set(random.choice(boxColor))
        })

        return(
            () => {
                props.audioRef.current.removeEventListener("timeupdate", timeUpdate)
                props.audioRef.current.removeEventListener("loadeddata", getSongFullDuration)
            }
        )
            
    }, [])


    useEffect(() => {
        console.log("set song .....  ")
        props.audioRef.current.src = `./audio/${songList.at(currentSong)}`
        return(() => {
            console.log("Music pause, change song")
            audioPause()
        })
    }, [currentSong])

    useFrame((_, delta) => {
        if(isPlay){
            boxRef.current.map((el) => {
                el.rotation.x += delta
                el.rotation.y += delta
            })
        }
    })

    function playBtnHandler(){
        isPlay ? audioPause() : audioPlay()
    }

    function seekSong(event){
        props.audioRef.current.currentTime = event.target.value
    }
    
    function nextSong(){
        setCurrentSong((prev) => (prev + 1) % songList.length)
    }

    function prevSong(){
        console.log(songList.at(-2))
        setCurrentSong((prev) => (prev - 1) % songList.length )
    }

        return(
            <>
                <group>
                    <BoxBackground boxRef={boxRef}/>
                </group>
                <group>
                    <Html transform >
                        <MediaPlayer seekSong={seekSong} songDuration={songDuration} songSliderRef={songSliderRef} fullDuration={fullDuration}/>
                    </Html>
                    <Html transform position={[0,2,1]}>
                        <SongImage />
                    </Html>
                    <Html transform position={[0,-2.5,1]}>
                        <PlayPauseBtn playBtnHandler={playBtnHandler} isPlay={isPlay}/>
                    </Html>
                    <Html transform position={[2,-2.5,1]}>
                        <NextSong nextSong={nextSong} />
                    </Html>
                    <Html transform position={[-2,-2.5,1]}>
                        <PrevSong prevSong={prevSong} />
                    </Html>
                </group>

                <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 1.5} minAzimuthAngle={-Math.PI / 4} maxAzimuthAngle={Math.PI / 4} enablePan={false}/>
                <ambientLight intensity={1} />
            </>
        )
}

export default PlayerUI