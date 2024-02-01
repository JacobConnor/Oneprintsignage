import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { PerspectiveCamera } from '@react-three/drei'

const root = ReactDOM.createRoot(document.querySelector('#root'))

const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const cameraFov = isMobile ? 75 : 50; // Larger FOV for mobile
const cameraPosition = isMobile ? [10, 10, 40] : [10, 10, 40]; // Further away for mobile



root.render(
    <Canvas
    concurrent gl={{ alpha: false }}  camera={{ position: cameraPosition, fov: cameraFov,  }}
    >

        <Experience />
    </Canvas>
)