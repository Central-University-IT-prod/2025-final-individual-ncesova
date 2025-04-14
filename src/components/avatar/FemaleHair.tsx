import { useAvatarStore } from "@/model/avatar/avatarStore";
import { ThreeElements } from "@react-three/fiber";

type FemaleHairProps = ThreeElements["group"];

export default function FemaleHair({ ...props }: FemaleHairProps) {
  const hairColor = useAvatarStore((store) => store.avatar.hairColor);

  return (
    <group {...props}>
      <mesh position={[0, 1.7, 0]}>
        <boxGeometry args={[1, 0.2, 1.1]} />
        <meshPhongMaterial color={hairColor} />
      </mesh>
      <mesh position={[0, 1.35, -0.4]}>
        <boxGeometry args={[0.9, 0.9, 0.2]} />
        <meshPhongMaterial color={hairColor} />
      </mesh>
      <mesh rotation-y={Math.PI / 2} position={[0.4, 1.1, 0]}>
        <boxGeometry args={[1.1, 1.3, 0.2]} />
        <meshPhongMaterial color={hairColor} />
      </mesh>
      <mesh rotation-y={Math.PI / 2} position={[-0.4, 1.1, 0]}>
        <boxGeometry args={[1.1, 1.3, 0.2]} />
        <meshPhongMaterial color={hairColor} />
      </mesh>
    </group>
  );
}
