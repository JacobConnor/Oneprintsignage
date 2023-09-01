
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import React, { Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial, Reflector,  Text, useTexture, useGLTF, useVideoTexture, OrbitControls } from '@react-three/drei'
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'


export default function Experience()
{ 

    const [isVideoOn, setVideoOn] = useState(true);

   
    return <>

        <Perf position="top-left" />
        {/* <Carla rotation={[0, Math.PI - 0.4, 0]} position={[-1.2, 0, 0.6]} scale={[0.26, 0.26, 0.26]} /> */}
        <color attach="background" args={['#bd0600']} />
      <fog attach="fog" args={['#bd0600', 5, 25]} />
      <Suspense fallback={null}>
        <group position={[0, -1, 0]}>

       
        <One rotation={[0, 0, 0]} position={[0, 1.3, -2]} scale={[50.0, 50.0, 50.0]} isVideoOn={isVideoOn} onClick={() => setVideoOn(!isVideoOn)} />
          {/* <VideoText position={[0, 1.3, -2]} /> */}

          <Printingandsignage position={[1, 0.5, -1.45]} scale={[50.0, 50.0, 50.0]} rotation={[0, 0, 0.035]}  />
          <Ground />
     
        
        </group>
        <ambientLight intensity={0.5} />
        {/* <spotLight position={[0, 10, 0]} intensity={0.1} /> */}
        <directionalLight position={[-50, 0, -40]} intensity={0.7} />
        <Intro />
      </Suspense>

      <OrbitControls />

{/* <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.5} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.2} height={512} />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1} />
        
      </EffectComposer> */}


    </>
}


function Carla(props) {
    const { scene } = useGLTF('/carla-draco.glb')
    return <primitive object={scene} {...props} />
  }

  function One({ isVideoOn, onClick, ...props }) {
    const { scene } = useGLTF('/one.gltf')
    
    const videoTexture1 = useVideoTexture('/drei.mp4');
    const videoTexture2 = useVideoTexture('/whitescreen.mp4');
   
      // If video is on, assign the video texture, else set to null
    const videoTexture = isVideoOn ? videoTexture2 : videoTexture1;

    if (scene && scene.children[0] && scene.children[0].material) {
        scene.children[0].material.map = videoTexture;
        if (!isVideoOn) {
            scene.children[0].material.color = new THREE.Color(0xFFFFFF); // Ensure color is white
        }
        scene.children[0].material.needsUpdate = true;
    }

    return <primitive object={scene} onClick={onClick} {...props} />
    }

    //function to load another object

    function Printingandsignage(props) {
        const { scene } = useGLTF('/printingandsignage.gltf')

        //for each object in the scene, apply the reflective material
        scene.traverse((child) => {
            if (child.isMesh) {
                // metal roughness = 0
                //child.material.metalness = 0;
                child.material.roughness = 0;
                child.material.color = new THREE.Color('#fff');
                child.material.needsUpdate = true;

            }
        });

        return <primitive object={scene} {...props} />
        }
  
//   function VideoText(props) {
//     const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/drei.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }))
//     useEffect(() => void video.play(), [video])
//     return (
        
//       <Text font="/Inter-Bold.woff" fontSize={3} letterSpacing={-0.06} {...props}>
//         One
//         <meshBasicMaterial toneMapped={false}>
//           <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
//         </meshBasicMaterial>
//       </Text>
//     )
//   }
  
  function Ground() {
    const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
    
    
    return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[800, 100]}
          resolution={2048}
          mixBlur={6}
          mixStrength={0.5}
          roughness={1.0}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#bd0600"
          metalness={0.4}
          distortionMap={floor}
        />
      </mesh> 
    )
    
    // return (
    //   <Reflector blur={[800, 100]} resolution={512} args={[100, 50]} mirror={0.5} mixBlur={6} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
    //     {(Material, props) => <Material color="#bd0600" metalness={0.4} roughnessMap={floor} normalMap={normal} normalScale={[2, 2]} {...props} />}
    //   </Reflector>
    // )
  }
  
  function Intro() {
    const [vec] = useState(() => new THREE.Vector3())
    return useFrame((state) => {
      state.camera.position.lerp(vec.set(state.mouse.x * 2.0, 0.5 + state.mouse.y * 2.0, 7), 0.025)
      //state.camera.position.set(0, 0, 5)
      state.camera.lookAt(0, 0, 0)
    })
  }