import Hand from "@/components/avatar/Hand";
import Head from "@/components/avatar/Head";
import Leg from "@/components/avatar/Leg";
import Torso from "@/components/avatar/Torso";
import { useAvatarStore } from "@/model/avatar/avatarStore";
import { ThreeElements } from "@react-three/fiber";

type PersonProps = ThreeElements["group"];

export default function Person({ ...props }: PersonProps) {
  const {
    fatPercent,
    handsMuscles,
    topColor,
    bottomColor,
    isTShirt,
    shoeColor,
    legsMuscle,
    skinColor,
  } = useAvatarStore((store) => store.avatar);
  return (
    <group {...props}>
      <Head skinColor={skinColor} />
      <Torso fatPercent={fatPercent} topColor={topColor} />
      <Hand
        fatPercent={handsMuscles}
        skinColor={skinColor}
        isTShirt={isTShirt}
        topColor={topColor}
        position={[-0.75, 0.5, 0]}
        rotation-x={Math.PI / 2}
        rotation-y={Math.PI / 4}
      />
      <Hand
        fatPercent={handsMuscles}
        skinColor={skinColor}
        isTShirt={isTShirt}
        topColor={topColor}
        scale={[-1, -1, -1]}
        position={[0.75, 0.5, 0]}
        rotation-y={Math.PI / 4}
        rotation-x={(3 * Math.PI) / 2}
      />
      <Leg
        fatPercent={legsMuscle}
        bottomColor={bottomColor}
        shoeColor={shoeColor}
        position={[-0.4, -1.5, 0]}
      />
      <Leg
        scale={[-1, 1, 1]}
        fatPercent={legsMuscle}
        bottomColor={bottomColor}
        shoeColor={shoeColor}
        position={[0.4, -1.5, 0]}
      />
    </group>
  );
}
