import { EffectComposer, N8AO } from "@react-three/postprocessing";

function Effects() {
  return (
    <EffectComposer disableNormalPass>
      <N8AO
        intensity={1}
        aoRadius={0.2}
        aoSamples={14}
        denoiseSamples={4}
        denoiseRadius={9}
        distanceFalloff={0.2}
      />
    </EffectComposer>
  );
}

export default Effects;
