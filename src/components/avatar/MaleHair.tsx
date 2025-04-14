import { useAvatarStore } from "@/model/avatar/avatarStore";
import { ThreeElements } from "@react-three/fiber";

type MaleHairProps = ThreeElements["group"];

export default function MaleHair({ ...props }: MaleHairProps) {
  const hairColor = useAvatarStore((store) => store.avatar.hairColor);
  return (
    <group {...props}>
      <mesh position={[0, 1.7, 0]}>
        <boxGeometry args={[0.9, 0.2, 0.9]} />
        <meshPhongMaterial color={hairColor} />
      </mesh>
      <mesh rotation-x={Math.PI / 2} position={[0, 1.6, -0.35]}>
        <boxGeometry args={[0.9, 0.2, 0.2]} />
        <meshPhongMaterial color={hairColor} />
      </mesh>
    </group>
  );
}
