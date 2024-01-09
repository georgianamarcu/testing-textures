import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const noise = new THREE.TextureLoader().load("/noise.png");

const RandomUVMaterial = shaderMaterial(
  {
    noiseMap: noise,
    enableRandom: 1,
    useNoiseMap: 1,
    debugNoise: 0,
    useSuslikMethod: 0,
  },
  /*glsl*/ `
      varying vec2 vUv;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
      }`/*glsl*/ `
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

			}`
);
