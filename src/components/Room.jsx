import { useGLTF, useTexture, Instance, Instances } from "@react-three/drei";
import { useRef, useLayoutEffect } from "react";
import { SRGBColorSpace } from "three";

export function Room(props) {
  const { nodes, materials } = useGLTF("/LivingRoom.glb");
  const floorRef = useRef();

  /** FIX MAP COLOR SPACE*/
  const fixBaked = (texture) => {
    texture.flipY = false;
    texture.colorSpace = SRGBColorSpace;
  };

  const floorLM = useTexture("/floor_lightMap.jpg", (texture) =>
    fixBaked(texture)
  );

  useTexture.preload("/floor_lightMap.jpg");

  /**CREATE 2ND UV SET AND APPLY LIGHTMAP */
  useLayoutEffect(() => {
    floorRef.current.geometry.attributes.uv2 =
      floorRef.current.geometry.attributes.uv;

    materials.floor.lightMap = floorLM;
    materials.floor.lightMapIntensity = 1.3;
    materials.floor.envMapIntensity = 0.8;
    materials.floor.roughness = 1;
  }, []);

  return (
    <group
      {...props}
      name={"room"}
      dispose={null}
      position={[0, -0.98, 0.95]}
      rotation={[0, -Math.PI, 0]}
    >
      <group name="furniture" visible={true}>
        <mesh
          geometry={nodes.Coffee_Table_Stolik_Hriby.geometry}
          material={materials.wood_brown}
          material-envMapIntensity={2}
          material-roughness={0.8}
          position={[0.380198, 0.014093, -0.019571]}
        />
        <mesh
          geometry={nodes.Coffee_Table_Stolik_Hriby001.geometry}
          material={materials.wood_brown}
          position={[-0.257254, 0.017082, -0.026831]}
        />
        <mesh
          geometry={nodes.Pampas.geometry}
          material={materials["Pampas Fur"]}
          position={[0.380314, 0.38724, -0.032459]}
        />
        <mesh
          geometry={nodes.Vase.geometry}
          material={materials.ceramic}
          position={[0.37964, 0.427085, -0.029213]}
        />
        <mesh
          geometry={nodes.Rug.geometry}
          material={materials["iMeshh Diamond Rug"]}
          material-envMapIntensity={1.2}
          position={[0.000267, -0.00601, -0.104072]}
          scale={[1.2, 0.999995, 1.2]}
        />
        <group
          position={[props.toggleSofa ? 2.8405 : 3.6, 0.458449, -1.17852]}
          rotation={[-Math.PI / 2, 0, 0.385864]}
          scale={[0.015, 0.33, 0.015]}
        >
          <mesh
            geometry={nodes.Cylinder.geometry}
            material={materials.chair_wood}
            material-roughness={0.5}
            material-envMapIntensity={0.9}
          />
          <mesh
            geometry={nodes.Cylinder_1.geometry}
            material={materials.Chair}
            material-envMapIntensity={1.8}
          />
        </group>
        <group position={[-0.268479, 0.414422, -0.02936]}>
          <mesh
            geometry={nodes["Decorations_Books_Magazine-Set_09004"].geometry}
            material={materials["Magazine Cover1.008"]}
          />
          <mesh
            geometry={nodes["Decorations_Books_Magazine-Set_09004_1"].geometry}
            material={materials["Magazine Edge"]}
          />
          <mesh
            geometry={nodes["Decorations_Books_Magazine-Set_09004_2"].geometry}
            material={materials["Magazine Cover1.004"]}
          />
        </group>
      </group>
      <group position={[-0.23791, 0.404748, -0.033389]}>
        <mesh
          geometry={nodes["Decorations_Books_Magazine-Set_09001"].geometry}
          material={materials["BookCover2.003"]}
          material-envMapIntensity={0.6}
        />
        <Instances
          range={1}
          geometry={nodes["Decorations_Books_Magazine-Set_09001"].geometry}
          material={materials["BookCover2.003"]}
          material-envMapIntensity={0.6}
        >
          <Instance position={[-0.49, -0.47, 0]} />
        </Instances>
        <mesh
          geometry={nodes["Decorations_Books_Magazine-Set_09001_1"].geometry}
          material={materials.Book_Cover_3}
          material-envMapIntensity={0.6}
        />
        <mesh
          geometry={nodes["Decorations_Books_Magazine-Set_09001_2"].geometry}
          material={materials.Book_Cover_1}
          material-envMapIntensity={0.6}
        />
        <mesh
          geometry={nodes["Decorations_Books_Magazine-Set_09001_3"].geometry}
          material={materials.Book_Cover_2}
          material-envMapIntensity={0.6}
        />
        <mesh
          geometry={nodes["Decorations_Books_Magazine-Set_09001_4"].geometry}
          material={materials.Book_Cover_4}
          material-envMapIntensity={0.6}
        />
        <mesh
          geometry={nodes["Decorations_Books_Magazine-Set_09001_5"].geometry}
          material={materials.Book_Cover_6}
          material-envMapIntensity={0.6}
        />
        <mesh
          geometry={nodes["Decorations_Books_Magazine-Set_09001_6"].geometry}
          material={materials["Book_Cover_1.001"]}
          material-envMapIntensity={0.6}
        />
        <mesh
          geometry={nodes["Decorations_Books_Magazine-Set_09001_7"].geometry}
          material={materials.Book_Cover_5}
          material-envMapIntensity={0.6}
        />
        <mesh
          geometry={nodes["Decorations_Books_Magazine-Set_09001_8"].geometry}
          material={materials.Book_Cover_7}
          material-envMapIntensity={0.6}
        />
        <Instances
          range={2}
          geometry={nodes["Decorations_Books_Magazine-Set_09001_9"].geometry}
          material={materials["BookCover2.009"]}
          material-envMapIntensity={0.6}
        >
          <Instance
            name="book-1-instance1"
            position={[-0.58, -0.47, 0]}
          ></Instance>
          <Instance
            name="book-1-instance2"
            position={[-0.46, -0.47, 0]}
          ></Instance>
        </Instances>
        <mesh
          name="book-1"
          geometry={nodes["Decorations_Books_Magazine-Set_09001_9"].geometry}
          material={materials["BookCover2.009"]}
          material-envMapIntensity={0.6}
        />
        <Instances
          geometry={nodes["Decorations_Books_Magazine-Set_09001_10"].geometry}
          material={materials["BookCover1.003"]}
          material-envMapIntensity={1.2}
        >
          <Instance
            name="book-2-instance"
            position={[-0.59, -0.47, 0]}
          ></Instance>
        </Instances>
        <mesh
          name="book-2"
          geometry={nodes["Decorations_Books_Magazine-Set_09001_10"].geometry}
          material={materials["BookCover1.003"]}
          material-envMapIntensity={0.6}
        />
        <mesh
          name="book-3"
          geometry={nodes["Decorations_Books_Magazine-Set_09001_11"].geometry}
          material={materials["BookCover2.002"]}
          material-envMapIntensity={0.6}
        />
        <mesh
          name="book-4"
          geometry={nodes["Decorations_Books_Magazine-Set_09001_12"].geometry}
          material={materials["BookCover4.002"]}
          material-envMapIntensity={0.6}
        />
        <mesh
          geometry={nodes["Decorations_Books_Magazine-Set_09001_13"].geometry}
          material={materials["BookCover5.002"]}
          material-envMapIntensity={0.6}
        />
      </group>
      <Instances
        range={1}
        geometry={nodes.Vase.geometry}
        material={materials.ceramic}
      >
        <Instance name="vase_instance" position={[2.48, 1.67, 3.85]} />
      </Instances>
      <group position={[0.610482, 1.6, 3.735977]}>
        <mesh
          geometry={
            nodes["Decorations_Frames_Drawing-Line_01_Frame1001"].geometry
          }
          material={materials.Decoration_Frames_Line_01}
        />
        <mesh
          geometry={
            nodes["Decorations_Frames_Drawing-Line_01_Frame1001_1"].geometry
          }
          material={materials.Paper_white}
        />
        <mesh
          geometry={
            nodes["Decorations_Frames_Drawing-Line_01_Frame1001_2"].geometry
          }
          material={materials.Decoration_Frames_Line_02}
        />
      </group>
      <group position={[-4.562702, -0.002326, 2.903325]}>
        <mesh
          geometry={nodes.Ficus_Lyrata_2004.geometry}
          material={materials["Stem_Diffuse.006"]}
        />
        <mesh
          geometry={nodes.Ficus_Lyrata_2004_1.geometry}
          material={materials["Ficus Leaf.005"]}
        />
        <mesh
          geometry={nodes.Ficus_Lyrata_2004_2.geometry}
          material={materials["Dirt.019"]}
        />
        <mesh
          geometry={nodes.Ficus_Lyrata_2004_3.geometry}
          material={materials["Metal Gold Marked.001"]}
        />
      </group>
      <mesh
        geometry={nodes.Ficus_Pot.geometry}
        material={materials.ceramic}
        position={[-4.562702, -0.002326, 2.903325]}
      />
      <mesh
        geometry={nodes.Curtains_on_Rail002.geometry}
        material={materials.Curtains}
        position={[-5.045755, 1.237375, 3.871499]}
      />
      <mesh
        geometry={nodes.Curtains_Straight.geometry}
        material={materials.Curtains}
        position={[-5.435162, 0, 1.940759]}
      />
      <group position={[-0.047368, 1.647, 0.798927]}>
        <mesh
          geometry={nodes.Lamp_Pendant_Fabric_Translucent_01_1.geometry}
          material={materials.Plastic_Universal_Black}
        />
        <mesh
          geometry={nodes.Lamp_Pendant_Fabric_Translucent_01_2.geometry}
          material={materials.Fabric_Lamp_Shade}
          material-envMapIntensity={0.8}
        />
      </group>
      <group position={[2.496614, 2.903934, 1.470416]}>
        <mesh
          geometry={nodes.Downlight001.geometry}
          material={materials.glass}
        />
        <mesh
          geometry={nodes.Downlight001_1.geometry}
          material={materials["Chrome Reflector"]}
        />
        <mesh
          geometry={nodes.Downlight001_2.geometry}
          material={materials.Plastic_Universal_Black}
        />
      </group>

      <mesh
        geometry={nodes.plaster.geometry}
        material={materials.plaster_baked}
        position={[0, 0, -0.632843]}
      />
      <mesh
        geometry={nodes.decorative_wall_Baked.geometry}
        material={materials.decorative_wall_Baked}
        position={[0, 0, -0.632843]}
      />
      <mesh
        ref={floorRef}
        receiveShadow
        geometry={nodes.floor.geometry}
        material={materials.floor}
        position={[0, 0, -0.632843]}
      />
      <mesh
        geometry={nodes.Ceiling.geometry}
        material={materials.ceiling_baked}
        position={[0, 2.937567, -0.632843]}
      />
      <mesh
        geometry={nodes.Architectural_Windows_Industrial_01_90cm.geometry}
        material={materials.Plastic_Universal_Black}
        position={[-5.09164, 1.249465, 4.006788]}
      />
      <mesh
        geometry={nodes.Architectural_Windows_Glass.geometry}
        material={materials.glass}
        position={[-5.09164, 1.249465, 4.006788]}
      />
      <mesh
        geometry={nodes.Shelves1_Baked.geometry}
        material={materials.Shelves1_Baked}
        position={[3.354114, 1.407992, 3.865585]}
      />
      <mesh
        geometry={nodes.wood_deco_Baked.geometry}
        material={materials.wood_deco_Baked}
        position={[-4.577824, 1.250417, 3.989789]}
      />
      <group
        position={[4.993673, 0.574233, 2.793477]}
        rotation={[-Math.PI, 1.33807, -Math.PI]}
      >
        <mesh
          geometry={nodes["Decorations_Vases_Set-Stone_01_Pots2001_1"].geometry}
          material={materials.Ceramic_Stone_Dark_Grey}
          material-envMapIntensity={0.5}
        />
        <mesh
          geometry={nodes["Decorations_Vases_Set-Stone_01_Pots2001_2"].geometry}
          material={materials.ceramic}
          material-envMapIntensity={0.6}
        />
      </group>
      <group
        position={[5.045422, 0.527114, 2.861985]}
        rotation={[-Math.PI, 1.33807, -Math.PI]}
      >
        <mesh
          geometry={nodes.Cylinder009.geometry}
          material={materials.Material}
        />
        <mesh
          geometry={nodes.Cylinder009_1.geometry}
          material={materials.wood}
          material-envMapIntensity={0.6}
        />
      </group>
      <group
        position={[5.028149, 1.364449, 2.982558]}
        rotation={[-Math.PI, 1.33807, -Math.PI]}
      >
        <mesh
          geometry={nodes.Lamp_Floor_Arched_Chrome_01_1.geometry}
          material={materials.glass}
        />
        <mesh geometry={nodes.Lamp_Floor_Arched_Chrome_01_2.geometry}>
          <meshStandardMaterial
            roughness={0.3}
            metalness={1}
            color={"#FFF"}
            envMapIntensity={0.4}
          />
        </mesh>
      </group>
      <mesh
        geometry={nodes.scandi_coffee_table001_Baked.geometry}
        material={materials["scandi coffee table.001_Baked"]}
        position={[5.045422, 0.527114, 2.861985]}
        rotation={[-Math.PI, 1.33807, -Math.PI]}
      />
      <group position={[5.583477, 1.413325, 1.440355]} scale={1}>
        <mesh geometry={nodes.Cube032.geometry}>
          <meshStandardMaterial color={"#BEB2A9"} envMapIntensity={0.4} />
        </mesh>
        <mesh
          geometry={nodes.Cube032_1.geometry}
          material={materials.quadro2_figura}
          material-envMapIntensity={0.6}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/LivingRoom.glb");
