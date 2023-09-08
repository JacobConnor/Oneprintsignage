import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { PerspectiveCamera } from '@react-three/drei'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
    concurrent gl={{ alpha: false }}  camera={{ position: [0, 15, 40], fov: 50,  }}
    >
       
        <Experience />
    </Canvas>
)