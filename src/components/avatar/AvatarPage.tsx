import { Canvas } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import Person from "@/components/avatar/Person";
import PurchasedItemsDrawer from "./PurchasedItemsDrawer";

export default function AvatarPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <PurchasedItemsDrawer />
      <div className="flex flex-col gap-2">
        <div className="rounded-lg bg-blue-100 p-4 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
          <p className="text-sm">
            Чем больше вы тренируетесь, тем более подтянутым и мускулистым
            становится ваш персонаж! Продолжайте заниматься, чтобы увидеть
            изменения.
          </p>
        </div>
        <div className="h-[calc(100vh-8rem)] w-full rounded-lg bg-muted">
          <Canvas>
            <PresentationControls
              enabled={true} // the controls can be disabled by setting this to false
              global={false} // Spin globally or by dragging the model
              cursor={true} // Whether to toggle cursor style on drag
              snap={true} // Snap-back to center (can also be a spring config)
              speed={1} // Speed factor
              zoom={1} // Zoom factor when half the polar-max is reached
              rotation={[0.5, 0.5, 0]} // Default rotation
              polar={[-Math.PI / 3, Math.PI / 3]} // Vertical limits
              azimuth={[-Math.PI / 2, Math.PI / 3]} // Horizontal limits
              // config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
            >
              <Person position={[0, 0.6, 0]} />
              <ambientLight intensity={0.1} />
              <directionalLight position={[3, 2, 5]} lookAt={0} color="white" />
            </PresentationControls>
          </Canvas>
        </div>
      </div>
    </div>
  );
}
