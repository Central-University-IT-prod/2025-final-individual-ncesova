import FemaleHair from "@/components/avatar/FemaleHair";
import MaleHair from "@/components/avatar/MaleHair";
import { useUserStore } from "@/model/user/userStore";
import { Image } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

type HeadProps = ThreeElements["group"] & {
  skinColor: string;
};

const maleFaceUrl = "/images/Manface.png";
const femaleFaceUrl = "/images/noFilter.png";

export default function Head({ skinColor, ...props }: HeadProps) {
  const isMale = useUserStore((store) => store.bodyStats.sex) === "male";
  return (
    <group {...props}>
      {isMale ? <MaleHair /> : <FemaleHair />}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshPhongMaterial color={skinColor} />
      </mesh>
      <Image
        scale={0.7}
        position={[0, 1.3, 0.41]}
        url={isMale ? maleFaceUrl : femaleFaceUrl}
      />
    </group>
  );
}
