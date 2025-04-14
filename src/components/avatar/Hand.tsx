import { ThreeElements } from "@react-three/fiber";

type HandProps = ThreeElements["group"] & {
  skinColor: string;
  topColor: string;
  isTShirt: boolean;
  fatPercent: number;
};

export default function Hand({
  skinColor,
  topColor,
  isTShirt,
  fatPercent,
  ...props
}: HandProps) {
  const muslcesSize = (30 - fatPercent) / 20;
  const handSize = 0.7 - muslcesSize / 3;
  const newTopColor = isTShirt ? skinColor : topColor;
  return (
    <group {...props}>
      <group>
        <mesh>
          <boxGeometry args={[1, handSize, handSize]} />
          <meshPhongMaterial color={topColor} />
        </mesh>
        <mesh
          rotateX={Math.PI / 2}
          position={[0, 0.2, 0]}
          scale={[1, muslcesSize, 0.5]}
        >
          <sphereGeometry args={[0.5, 32, 16]} />
          <meshPhongMaterial color={topColor} />
        </mesh>
      </group>
      <group
        position={[-0.8, 0.3, 0.1]}
        scale={0.7}
        rotation-z={-Math.PI / 4}
        rotation-y={Math.PI / 8}
      >
        <mesh>
          <boxGeometry args={[1.2, handSize, handSize]} />
          <meshPhongMaterial color={newTopColor} />
        </mesh>
        <mesh
          rotateX={Math.PI / 2}
          position={[0, 0.2, 0]}
          scale={[1.2, muslcesSize, 0.5]}
        >
          <sphereGeometry args={[0.5, 32, 16]} />
          <meshPhongMaterial color={newTopColor} />
        </mesh>
      </group>
      <mesh position={[-1.15, 0.75, 0.25]} scale={0.5}>
        <sphereGeometry args={[0.5, 32, 16]} />
        <meshPhongMaterial color={skinColor} />
      </mesh>
    </group>
  );
}
