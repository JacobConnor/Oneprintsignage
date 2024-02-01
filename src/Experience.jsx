
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import React, { Suspense, useEffect, useState, useRef  } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial, Reflector,  Text, Stars, Text3D, useTexture, useGLTF, Html, Circle, Cylinder, useVideoTexture, OrbitControls, useCursor, Sparkles } from '@react-three/drei'
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette, FXAA } from '@react-three/postprocessing'
import { useSpring, animated } from '@react-spring/three';



export default function Experience()
{ 

    const [isVideoOn, setVideoOn] = useState(true);
    const [hovered, set] = useState()
    useCursor(hovered, /*'pointer', 'auto', document.body*/)
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    


    const { position } = useSpring({ position: hovered ? [0, 0.05, 1.5] : [0, 0.1, 1.5] })



    
    return <>

        {/* <Perf position="top-left" /> */}
        {/* <Carla rotation={[0, Math.PI - 0.4, 0]} position={[-1.2, 0, 0.6]} scale={[0.26, 0.26, 0.26]} /> */}
        <color attach="background" args={ isVideoOn ? ['#000'] : ['#bd0600'] } />
      <fog attach="fog" args={ isVideoOn ? ['#000', 5, 25] :  ['#bd0600', 5, 25]  } />
      <Suspense fallback={null}>
        <group position={[0, -1, 0]}>

       
        <One rotation={[0, 0, 0]} position={[0, 1.3, -2]} scale={[50.0, 50.0, 50.0]} isVideoOn={isVideoOn}   />
          

          <Printingandsignage position={[1, 0.5, -1.45]} scale={[50.0, 50.0, 50.0]} rotation={[0, 0, 0.035]} isVideoOn={isVideoOn}   />
          <Ground color={isVideoOn ? "#050505" : "#bd0600"} isVideoOn={isVideoOn}  />
     
        
          {/* //rotate the power button to be flat on Ground */}
          {/* <PowerButton rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0, 1]} scale={[10, 10, 10]} onClick={() => setVideoOn(!isVideoOn)} onPointerOver={() => set(true)} onPointerOut={() => set(false)}  /> */}


          {/* emmisive hovering light object round shape */}
        
          <TopButton  position={position} onClick={() => setVideoOn(!isVideoOn)} onPointerOver={() => set(true)} onPointerOut={() => set(false)} hovered={hovered} />

          <mesh position={[0, -0.03, 1.5]} scale={[4, 4, 4]} onClick={() => setVideoOn(!isVideoOn)} onPointerOver={() => set(true)} onPointerOut={() => set(false)} >
            <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
            <meshBasicMaterial color={"#1e1d1d"}
            />
          </mesh>

          {/* disc shape like a hockey puck */}
          

          {/* <Text  position={[0, 0.16, 1]} scale={[0.2, 0.2, 0.2]} rotation={[-Math.PI * 0.5, 0, 0]} >
            Play
          </Text> */}
           {/* <VideoText position={[0, 1, 0]} /> */}

          

        </group>

        {isVideoOn &&
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        }
     
     {/* <Astronaut position={[2, 2, -10]} scale={0.1} /> */}
        


        {/* <ambientLight intensity={isVideoOn ? 0.9 : 1.0} />
        <spotLight position={[0, 10, 0]} intensity={0.1} />
        <directionalLight position={[-50, 0, -40]} intensity={0.0} /> */}

        <ambientLight intensity={1} color={isVideoOn ? 'black' : 'lightred'} />
        <spotLight position={[10, 15, 10]} intensity={0.5} castShadow />
        <directionalLight position={[-8, 12, 8]} intensity={0.7} castShadow />

        <Intro />

        {/* a square that doesn't require lights to be bright */}
        
        {/* <Html 
          fullscreen
          //transform
        >

        <img className='playbtn' src='play2.png' 
        onClick={() => setVideoOn(!isVideoOn)} 
        onPointerOver={() => set(true)} 
        onPointerOut={() => set(false)}
        />
          
        </Html> */}

    
          


      </Suspense>

      <OrbitControls maxAzimuthAngle={0.005}   />

   
 
{/* <EffectComposer>
      <FXAA  />
        <DepthOfField focusDistance={0} focalLength={40} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0.55} luminanceSmoothing={0.2} height={512} />
        <Noise opacity={0.05} />
        <Vignette eskil={true} offset={0.1} darkness={1} /> 
        
      </EffectComposer> */}
{!isMobile && 
<EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={1} />
        <DepthOfField target={[0, 0, 13]} focalLength={0.3} bokehScale={0.1} height={700} />
      </EffectComposer>
}
      
    </>
}


function Carla(props) {
    const { scene } = useGLTF('/carla-draco.glb')
    return <primitive object={scene} {...props} />
  }



  function TopButton({ hovered, position, ...props }) {
    // Load the play icon texture
    const playIconTexture = useTexture('/3d/play4.png'); // Replace with the actual path to your play icon image

    // Adjust the dimensions of the icon plane to fit the button
    const iconWidth = 1;   // Adjust as needed
    const iconHeight = 1;  // Adjust as needed

    return (
      <animated.group position={position}>
        {/* Existing button mesh */}
        <animated.mesh {...props} scale={[3, 3, 3]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
            <meshStandardMaterial 
            color={hovered ? 'green' : 'red'}
            roughness={1} // Adjust for less shine (0 = glossy, 1 = matte)
            metalness={0.4} // Adjust for metallic feel (0 = non-metallic, 1 = metallic)

          />
        </animated.mesh>

        {/* Play icon mesh */}
        <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[iconWidth, iconHeight]} />
            <meshBasicMaterial map={playIconTexture} transparent={true} />
        </mesh>
      </animated.group>
    );
}



  function One({ isVideoOn, onClick, ...props }) {
    const { scene } = useGLTF('/3d/one.gltf')
    
    const videoTexture1 = useVideoTexture('/3d/drei.mp4');
    const videoTexture2 = useVideoTexture('/3d/static.mp4');
   
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

    // function Astronaut(props) {
    //   const { scene } = useGLTF('/Astronaut.glb')
    //   const meshRef = useRef();
    
    //   // Duration in seconds for one full circular rotation
    //   const rotationDuration = 10;
    //   // Radius of the circle
    //   const radius = 5;
    //   // Vertical oscillation amplitude
    //   const verticalOscillationAmplitude = 0.5;
    
    //   useFrame((state) => {
    //     if (meshRef.current) {
    //       // Time since starting in seconds
    //       const t = state.clock.elapsedTime;
          
    //       // Circular motion
    //       const x = Math.cos((2 * Math.PI * t) / rotationDuration) * radius;
    //       const z = Math.sin((2 * Math.PI * t) / rotationDuration) * radius;
          
    //       // Vertical oscillation
    //       const y = 1;
          
    //       meshRef.current.position.set(x, y, z);
    //     }
    //   });
      
    //   return <primitive object={scene} ref={meshRef} {...props} />
    // }
    
  


    //function to load another object

    function Printingandsignage({ isVideoOn, ...props}) {
        const { scene } = useGLTF('/3d/printingandsignage.gltf')

        //for each object in the scene, apply the reflective material
        scene.traverse((child) => {
            if (child.isMesh) {
                // metal roughness = 0
                //child.material.metalness = 0;
                child.material.roughness = 0;

                if(isVideoOn) {
                  child.material.color = new THREE.Color('grey');
                  child.material.emissive = new THREE.Color('grey');
                  child.material.emissiveIntensity = 0.1;
                  //child.material.emissive = new THREE.Color('#fff');
                  //child.material.emissiveIntensity = 0.4;
                //   child.material.roughness = 1; // Fully rough to avoid reflections
                // child.material.metalness = 0; // Non-metallic surface
                } else {
                  child.material.color = new THREE.Color('#fff');
                 
                }
                
                child.material.needsUpdate = true;

            }
        });

        return <primitive object={scene} {...props} />
        }
  
  function VideoText(props) {
    const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/drei.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }))
    useEffect(() => void video.play(), [video])
    return (
        
      <Text font="/Inter-Bold.woff" fontSize={1} letterSpacing={-0.06} {...props}>
        DO IT
        <meshBasicMaterial />
      </Text>
    )
  }



  
function PowerButton (props) {
  const { scene } = useGLTF('/button.gltf')

  //for each object scattered in the scene
  scene.traverse((child) => {


    if(child.name == "mesh_0") {
      child.position.set(0, -0.023, 0.025) 
      //rotate child 180 degrees
      child.material.emissive = new THREE.Color('#bd0600');
    }
      if(child.name == "mesh_1") {
        child.position.set(0, -0.023, 0.025) 
        //rotate child 180 degrees
        child.material.emissive = new THREE.Color('#bd0600');
        child.material.emissiveIntensity = 0.4;
      }

      if(child.name == "mesh_2") {
        child.position.set(0, -0.017, 0.015)
        child.material.emissive = new THREE.Color('black');
        child.material.emissiveIntensity = 0.4;
      }

      if(child.name == "mesh_3") {
        child.position.set(0, -0.012, 0.02)
        child.material.emissive = new THREE.Color('darkorange');
        child.material.emissiveIntensity = 0.4;
      }

      if(child.name == "mesh_4") {
        
        child.material.emissive = new THREE.Color('darkred');
        child.material.emissiveIntensity = 0.6;
      }


      

  });

  return <primitive object={scene} {...props} />
  }

  

  //function to create 20 floating spheres using three js

  



  function Ground({isVideoOn, ...props}) {
    const [floor, normal] = useTexture(['/3d/SurfaceImperfections003_1K_var1.jpg', '/3d/SurfaceImperfections003_1K_Normal.jpg'])
    
    console.log(isVideoOn)
    
    return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />

        
        <MeshReflectorMaterial
          blur={[800, 100]}
          resolution={2048}
          mixBlur={isVideoOn ? 6 : 2}
          mixStrength={isVideoOn ? 60 : 0.5}
          roughness={1.0}
          depthScale={1.2}
          minDepthThreshold={0.2}
          maxDepthThreshold={isVideoOn ? 1.4 : 1.5 }
          color={props.color}
          metalness={0.4}
          distortionMap={floor}
          //wireframe
        />

      {/* <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={0.5}
          color="#050505"
          metalness={0.5}
        /> */}


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
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const finalCameraPostionX = isMobile ? 0.4 : 2.0; // Further away for mobile


    return useFrame((state) => {
      state.camera.position.lerp(vec.set(state.mouse.x - finalCameraPostionX, 1.5 + state.mouse.y * 1.0, 7), 0.025)
      //state.camera.position.set(-2, 2, 7)
      state.camera.lookAt(0, 0, 0)
    })
  }