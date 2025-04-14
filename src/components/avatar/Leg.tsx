import { ThreeElements } from "@react-three/fiber";

type LegProps = ThreeElements["group"] & {
  bottomColor: string;
  shoeColor: string;
  fatPercent: number;
};

export default function Leg({
  bottomColor,
  shoeColor,
  fatPercent,
  ...props
}: LegProps) {
  const muslcesSize = (30 - fatPercent) / 20;
  const legSize = 0.3 + muslcesSize * 0.3;
  return (
    <group {...props}>
      <group
        rotation-x={-Math.PI / 12}
        rotation-z={-Math.PI / 20}
        position={[0, 0.1, 0.2]}
      >
        <mesh>
          <boxGeometry args={[legSize, 1, legSize]} />
          <meshPhongMaterial color={bottomColor} />
        </mesh>
      </group>
      <group scale={0.8} position={[0, -0.9, 0.2]} rotation-x={Math.PI / 12}>
        <mesh>
          <boxGeometry args={[legSize, 1.5, legSize]} />
          <meshPhongMaterial color={bottomColor} />
        </mesh>
      </group>
      <mesh position={[0, -1.5, 0.3]}>
        <boxGeometry args={[0.5, 0.2, 1]} />
        <meshPhongMaterial color={shoeColor} />
      </mesh>
    </group>
  );
}
