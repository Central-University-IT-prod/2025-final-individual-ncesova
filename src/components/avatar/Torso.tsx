import { useUserStore } from "@/model/user/userStore";
import { ThreeElements } from "@react-three/fiber";

type TorsoProps = ThreeElements["group"] & {
  topColor: string;
  fatPercent: number;
};

export default function Torso({ topColor, fatPercent, ...props }: TorsoProps) {
  const sex = useUserStore((store) => store.bodyStats.sex);
  return (
    <group {...props}>
      <mesh>
        <boxGeometry args={[1, 2, 1]} />
        <meshPhongMaterial color={topColor} />
      </mesh>
      {sex === "female" && (
        <mesh rotation-z={Math.PI / 2} position={[0, 0.5, 0.3]}>
          <capsuleGeometry args={[0.4, 0.4, 4, 10]} />
          <meshPhongMaterial color={topColor} />
        </mesh>
      )}
      <group>
        <mesh
          rotateX={Math.PI / 2}
          position={[0, -0.25, 0.4]}
          scale={[1, 1.4, fatPercent / 10 / 2]}
        >
          <sphereGeometry args={[0.5, 32, 16]} />
          <meshPhongMaterial color={topColor} />
        </mesh>
      </group>
    </group>
  );
}
