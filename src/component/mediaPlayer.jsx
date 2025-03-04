import {Html, OrbitControls, Float} from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import random from "random";
import axios from "axios";
import { ImageList, ImageListItem, ImageListItemBar, IconButton, Button, createTheme, colors, ThemeProvider, Box, Slider } from '@mui/material';
import PlayCircle from "@mui/icons-material/PlayCircle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastFowardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const theme = createTheme({
    palette: {
        light: {
            main: colors.deepOrange[500]
        },
        dark: {
            main: colors.purple[200]
        }
    }
})

const PlayPauseBtn = (props) => {
    // <button className='controllBtn text-black' onClick={props.playBtnHandler}>{props.isPlay ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}</button>
    return(
        <ThemeProvider theme={theme}>
            <Button variant="outlined" disabled={props.loading ? true : false} color={props.isDarkMode ? "light" : "dark"} onClick={props.playBtnHandler}>{props.isPlay ? <PauseIcon /> : <PlayArrowIcon />}</Button>
        </ThemeProvider>
    )
}
const NextSong = (props) => {
    // <button className='controllBtn text-black' onClick={props.nextSong}><FontAwesomeIcon icon={faForwardStep} /></button>
    return(
        <ThemeProvider theme={theme}>
            <Button variant="outlined" disabled={props.loading ? true : false} color={props.isDarkMode ? "light" : "dark"} onClick={props.nextSong}><FastFowardIcon /></Button>
        </ThemeProvider>
    )
}
const PrevSong = (props) => {
    // <button className='controllBtn text-black' onClick={props.prevSong}><FontAwesomeIcon icon={faBackwardStep} /></button>
    return(
        <ThemeProvider theme={theme}>
            <Button variant="outlined" disabled={props.loading ? true : false} onClick={props.prevSong} color={props.isDarkMode ? "light" : "dark"}><FastRewindIcon /></Button>
        </ThemeProvider>
    )
}

const ModeButton = (props) => {
    // <button className='controllBtn text-black' onClick={props.darkModeBtnHandler}>{props.isDarkMode ? <FontAwesomeIcon icon={faSun}/> : <FontAwesomeIcon icon={faMoon}/> }</button>
    return(
        <ThemeProvider theme={theme}>
            <Button variant="outlined" disabled={props.loading ? true : false} onClick={props.darkModeBtnHandler} color={props.isDarkMode ? "light" : "dark"}>{props.isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}</Button>
        </ThemeProvider>
        
    )
}

const SongTitle = (props) => {
    return(
        <>
        <h1 className='song-title text-center text-black'>
            {props.songName ? props.songName : "Song Name"}
        </h1>
        <h1 className='song-title text-center text-black'>
            {props.songArtist ? props.songArtist : "Artist"}
        </h1>
        </>
    )
}

const SongList = (props) => {
    const { songList, setSong, currentSong, loading } = props;

    return(
        <ImageList sx={{ width: 500, height: 450, background: "tranparend" }}>
                {
                    songList && songList.map((item, index) => (
                        <ImageListItem key={item.coverImg}>
                        <img
                            srcSet={`${item.coverImg}`}
                            src={`${item.coverImg}`}
                            alt={item.name}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.name}
                            subtitle={item.artist}
                            actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${item.title}`}
                                onClick={() => {
                                    currentSong.current = index
                                    setSong()
                                }}
                                disabled={loading ? true : false}
                            >
                                <PlayCircle />
                            </IconButton>
                            }
                        />
                        </ImageListItem>
                    ))
                }
        </ImageList>
    )



    // function rowItem(ListProps){
    //     const {index, style} = ListProps
    //     if(songList){
    //         return(
    //                 <ListItem style={style} key={index} component="div" disablePadding>
    //                     <ListItemButton onClick={() => {
    //                         currentSong.current = index
    //                         setSong()}}
    //                         selected={currentSong.current === index}
    //                         >
    //                         <ListItemText primary={`${songList[index].name} - ${songList[index].artist}`} />
    //                     </ListItemButton>
    //                 </ListItem>
    //         )
    //     }
    //     // else return loading
    // }
    // return(
    //     <Box sx={{ width: '100%', height: 400, maxWidth: 800 }} className={"songList"}>
    //         <FixedSizeList
    //             height={400}
    //             width={350}
    //             itemSize={45}
    //             itemCount={songList ? songList.length : 0}
    //         >
    //             {rowItem}
    //         </FixedSizeList>
    //     </Box>

    // )
}

const MediaPlayer = (props) => {
    const {songDuration, duration, currentSongTime, seekSong, fullDuration, loading, isDarkMode} = props
    return(
        <div className='mediaPlayer'>
            <div className='flex'>
                <h2 className='text-black mx-3'>{songDuration}</h2>
                {/* <input ref={props.songSliderRef} className='mx-3' type="range" min={0} onChange={props.seekSong} name="songSlider" id="songSlider" /> */}
                <Box sx={{ width: 300 }}>
                    <ThemeProvider theme={theme}>
                        <Slider
                            size="small"
                            value={currentSongTime.current}
                            max={duration.current}
                            onChange={seekSong}
                            disabled={loading ? true : false}
                            color={isDarkMode ? "light" : "dark"}
                        />
                    </ThemeProvider>
                </Box>
                <h2 className='text-black mx-3'>{fullDuration}</h2>
            </div>
        </div>
    )
}

const SongImage = (props) => {
    return(
        <img className='songImage' ref={props.coverImgRef} src="./image/no_image.png" alt="no_image" />
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
                <mesh position={pos} ref={(el) => props.boxRef.current[index] = el}>
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
    const currentSong = useRef(0)
    const duration = useRef(0)
    const currentSongTime = useRef(0)

    // const songSliderRef = useRef()
    
    const [fullDuration, setFullDuration] = useState("00:00")
    const [songList, setSongList] = useState(false)
    const [songName, setSongName] = useState()
    const [songArtist, setSongArtist] = useState()


    const boxRef = useRef([])

    const boxColor = [0x7e1891, 0xe73879, 0xf26b0f, 0xfcc737, 0x2973b2, 0x48a6a7, 0x9acbd0, 0xf2efe7, 0xdad2ff, 0xb2a5ff, 0x71c9ce, 0xa6e3e9, 0xcbf1f5, 0xe3fdfd, 0xdd88cf]

    const [isDarkMode, setDarkMode] = useState(true)

    const imageRef = useRef()
    const coverImgRef = useRef()

    async function GetSongList(){
        const endpoint = `https://andrew26.pythonanywhere.com/music/songlist`
        useEffect(() => {
            async function fectData(){
                props.setLoading(() => true)
                const {data} = await axios.get(endpoint)
                setSongList(() => data)
                coverImgRef.current.src = data[0].coverImg
                setSongName(data[0].name)
                setSongArtist(data[0].artist)
                props.audioRef.current.src = `https://andrew26.pythonanywhere.com/music/${data[0].name}.mp3`
            }
            try {
                fectData()
            } catch (error) {
                console.log(error)
            }
            
        }, [])
    }
    GetSongList()
    function audioPlay(){
        props.audioRef.current.play()
        setPlay(() => true)
    }
    
    function setSong(){
        props.setLoading(() => true)
        audioPause()
        const name = songList.at(currentSong.current).name
        const image = songList.at(currentSong.current).coverImg
        const artist = songList.at(currentSong.current).artist
        coverImgRef.current.src = image
        setSongName(() => name)
        setSongArtist(() => artist)
        console.log(`set song ..... ${name} `)
        props.audioRef.current.src = `https://andrew26.pythonanywhere.com/music/${name}.mp3`
    }

    function audioPause(){
        props.audioRef.current.pause()
        setPlay(() => false)
    }



    function getSongFullDuration(){
        let formatMinute = Math.floor(props.audioRef.current.duration / 60).toString().padStart(2, "0")
        let formatSecound = Math.floor(props.audioRef.current.duration % 60).toString().padStart(2, "0")
        setFullDuration(() => `${formatMinute}:${formatSecound}`)
        // songSliderRef.current.setAttribute('max', props.audioRef.current.duration)
        duration.current = props.audioRef.current.duration
        currentSongTime.current = 0
        props.setLoading(() => false)
        
    }


    function timeUpdate(){
        let minute = Math.floor(props.audioRef.current.currentTime / 60)
        let secound = Math.floor(props.audioRef.current.currentTime % 60)
        let formatMinute = minute.toString().padStart(2, "0")
        let formatSecound = secound.toString().padStart(2, "0")
        currentSongTime.current = props.audioRef.current.currentTime
        setSongDuration(() => `${formatMinute}:${formatSecound}`)
        if(props.audioRef.current.currentTime === props.audioRef.current.duration){
           audioPlay()
            }
    }

    function darkModeBtnHandler(){
        console.log(isDarkMode)
        setDarkMode((prev) => !prev)
        document.documentElement.classList.toggle("dark")
        
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

    useFrame((_, delta) => {
        if(isPlay){
            boxRef.current.map((el) => {
                el.rotation.x += delta
                el.rotation.y += delta
            })
            imageRef.current.rotation.y += delta
        }
    })

    function playBtnHandler(){
        isPlay ? audioPause() : audioPlay()
    }

    function seekSong(event){
        props.audioRef.current.currentTime = event.target.value
    }
    
    function nextSong(){
        currentSong.current = (currentSong.current + 1) % songList.length
        setSong()
    }

    function prevSong(){
        currentSong.current = (currentSong.current - 1) % songList.length
        setSong()
    }

        return(
            <>
                <group>
                    <Float key={"Floating Box"} rotationIntensity={1} floatIntensity={1} floatingRange={[-5,1.5]}>
                        <BoxBackground boxRef={boxRef}/>
                    </Float>
                </group>
                <group>
                    <Html key={"MediaPlayer"} transform  position={[0,-3,0]}>
                        {/* <MediaPlayer seekSong={seekSong} songDuration={songDuration} songSliderRef={songSliderRef} fullDuration={fullDuration}/> */}
                        <MediaPlayer seekSong={seekSong} songDuration={songDuration} fullDuration={fullDuration} duration={duration} currentSongTime={currentSongTime} loading={props.loading} isDarkMode={isDarkMode}/>
                    </Html>
                    <group ref={imageRef} position={[0,0,1]}>    
                        <Html key={"SongImage"} transform position={[0,2.5,1]}>
                            <SongImage coverImgRef={coverImgRef}/>
                        </Html>
                    </group>
                    <Html key={"SongTitle"} transform position={[0,-1,1]}>
                        <SongTitle songName={songName} songArtist={songArtist}/>
                    </Html>
                    <Html key={"PlayButton"} transform position={[0,-4,1]}>
                        <PlayPauseBtn playBtnHandler={playBtnHandler} isPlay={isPlay} isDarkMode={isDarkMode} loading={props.loading}/>
                    </Html>
                    <Html key={"NextButton"} transform position={[2,-4,1]}>
                        <NextSong nextSong={nextSong} isDarkMode={isDarkMode} loading={props.loading}/>
                    </Html>
                    <Html key={"PrevButton"} transform position={[-2,-4,1]}>
                        <PrevSong prevSong={prevSong} isDarkMode={isDarkMode} loading={props.loading}/>
                    </Html>
                    <Html key={"ModeButton"} transform position={[4,4,1]}>
                        <ModeButton isDarkMode={isDarkMode} setDarkMode={setDarkMode} darkModeBtnHandler={darkModeBtnHandler} loading={props.loading}/>
                    </Html>
                    <Html key={"SongList"} transform position={[-12,0,0]} rotation={[0,0.4,0]}>
                        <SongList songList={songList} setSong={setSong} currentSong={currentSong} loading={props.loading}/>
                    </Html>
                </group>

                <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 1.5} minAzimuthAngle={-Math.PI / 4} maxAzimuthAngle={Math.PI / 4} enablePan={false}/>
                <ambientLight intensity={1} />
            </>
        )
}

export default PlayerUI