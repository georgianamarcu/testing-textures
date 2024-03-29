import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useMemo } from "react";
import { useAppStore } from "../store/appStore";
import {
  TextureLoader,
  SRGBColorSpace,
  LinearSRGBColorSpace,
  RepeatWrapping,
  MeshStandardMaterial,
  Texture,
} from "three";

export function Sofa(props) {
  const { nodes, materials } = useGLTF("/headboard.glb");
  const albedoUrl = useAppStore((state) => state.albedoUrl);
  const roughnessUrl = useAppStore((state) => state.roughnessUrl);
  const normalsUrl = useAppStore((state) => state.normalsUrl);
  const repeat = useAppStore((state) => state.repeat);
  const enableRandom = useAppStore((state) => state.enableRandom);
  const useNoiseMap = useAppStore((state) => state.useNoiseMap);
  const useSuslikMethod = useAppStore((state) => state.useSuslikMethod);
  const debugNoise = useAppStore((state) => state.debugNoise);

  let uniforms;

  const sofa = useRef();
  const standardMaterial = new MeshStandardMaterial();

  //**RANDOM UV SHADER */
  const textureLoader = useMemo(() => new TextureLoader(), []);
  const noise = textureLoader.load("/noise.png");

  const randomUV = `

			uniform sampler2D noiseMap;
			uniform float enableRandom;
			uniform float useNoiseMap;
			uniform float debugNoise;
			uniform float useSuslikMethod;

			float directNoise(vec2 p){
			    vec2 ip = floor(p);
			    vec2 u = fract(p);
			    u = u*u*(3.0-2.0*u);
			    
			    float res = mix(
			        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
			        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
			    return res*res;
			}

			float sum( vec4 v ) { return v.x+v.y+v.z; }

			vec4 textureNoTile( sampler2D mapper, in vec2 uv ){

			    // sample variation pattern
			    float k = 0.0;
			    if( useNoiseMap == 1.0 ) k = texture2D( noiseMap, 0.005*uv ).x;
			    else k = directNoise( uv );
			    
			    // compute index    
			    float index = k*8.0;
			    float f = fract( index );
			    float ia = 0.0;
			    float ib = 0.0;

			    if( useSuslikMethod == 1.0 ){
			    	ia = floor(index+0.5);
			    	ib = floor(index);
			    	f = min(f, 1.0-f)*2.0;
			    } else {
			    	ia = floor( index );
			    	ib = ia + 1.0;
			    }

			    // offsets for the different virtual patterns    
			    vec2 offa = sin(vec2(3.0,7.0)*ia); // can replace with any other hash    
			    vec2 offb = sin(vec2(3.0,7.0)*ib); // can replace with any other hash    

			    // compute derivatives for mip-mapping    
			    vec2 dx = dFdx(uv);
			    vec2 dy = dFdy(uv);
			    
			    // sample the two closest virtual patterns    
			    vec4 cola = textureGrad( mapper, uv + offa, dx, dy );
			    vec4 colb = textureGrad( mapper, uv + offb, dx, dy );
			    if( debugNoise == 1.0 ){
			    	cola = vec4( 0.1,0.0,0.0,1.0 );
			    	colb = vec4( 0.0,0.0,1.0,1.0 );
			    }

			    // interpolate between the two virtual patterns    
			    return mix( cola, colb, smoothstep(0.2,0.8,f-0.1*sum(cola-colb)) );

			}`;

  const mapRemplace = `
			#ifdef USE_MAP

				if( enableRandom == 1.0 ) diffuseColor *= textureNoTile( map, vMapUv );
				else diffuseColor *= texture2D( map, vMapUv );

			#endif
			`;

  standardMaterial.onBeforeCompile = function (shader) {
    shader.uniforms["noiseMap"] = { value: noise };
    shader.uniforms["enableRandom"] = { value: enableRandom };
    shader.uniforms["useNoiseMap"] = { value: useNoiseMap };
    shader.uniforms["useSuslikMethod"] = { value: useSuslikMethod };
    shader.uniforms["debugNoise"] = { value: debugNoise };

    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <clipping_planes_pars_fragment>",
      "#include <clipping_planes_pars_fragment>" + randomUV
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <map_fragment>",
      mapRemplace
    );

    uniforms = shader.uniforms;
  };

  useEffect(() => {
    const sofaMesh = sofa.current;
    if (!sofaMesh) return;

    const updateTexture = (url, mapType, colorSpace) => {
      if (url) {
        textureLoader.load(
          url,
          (texture) => {
            texture.colorSpace = colorSpace;
            texture.flipY = false;
            texture.repeat.set(repeat, repeat);
            texture.wrapS = RepeatWrapping;
            texture.wrapT = RepeatWrapping;

            if (!sofaMesh.material[mapType]) {
              sofaMesh.material[mapType] = new Texture();
            }

            sofaMesh.material[mapType].dispose();
            sofaMesh.material[mapType] = texture;
            sofaMesh.material.needsUpdate = true;
          },
          undefined,
          (error) => {
            console.error("Texture load error:", error);
          }
        );
      } else {
        if (sofaMesh.material[mapType]) {
          sofaMesh.material[mapType].dispose();
          sofaMesh.material[mapType] = null;
          sofaMesh.material.needsUpdate = true;
        }
      }
    };

    updateTexture(albedoUrl, "map", SRGBColorSpace);
    updateTexture(roughnessUrl, "roughnessMap", LinearSRGBColorSpace);
    updateTexture(normalsUrl, "normalMap", LinearSRGBColorSpace);
  }, [
    albedoUrl,
    roughnessUrl,
    normalsUrl,
    repeat,
    sofa,
    enableRandom,
    useNoiseMap,
    useSuslikMethod,
    debugNoise,
  ]);

  return (
    <group {...props} dispose={null} scale={[5, 5, 5]}>
      <mesh
        ref={sofa}
        geometry={nodes.hoofdbord.geometry}
        material={standardMaterial}
        position={[-0.006, 0.432, 0]}
      ></mesh>
    </group>
  );
}

useGLTF.preload("/sofa.glb");
