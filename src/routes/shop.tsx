import { createFileRoute } from "@tanstack/react-router";
import { useShopStore } from "@/model/shop/shopStore";
import { useUserStore } from "@/model/user/userStore";
import { useAvatarStore } from "@/model/avatar/avatarStore";
import { Button } from "@/shared/components/ui/button";
import Scaffold from "@/shared/components/Scaffold";
import { useAchievementsStore } from "@/model/achievements/achievementsStore";

export const Route = createFileRoute("/shop")({
  component: ShopComponent,
});

function ShopComponent() {
  const items = useShopStore((s) => s.items);
  const purchaseItem = useShopStore((s) => s.purchaseItem);
  const points = useUserStore((s) => s.points);
  const updateAvatar = useAvatarStore((s) => s.updateAvatar);

  const handlePurchase = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    // Check if user has enough points
    if (points < item.price) {
      alert("Недостаточно очков!");
      return;
    }

    // Purchase item
    purchaseItem(itemId);

    // If it's a hair color, apply it immediately
    if (item.type === "hairColor") {
      updateAvatar({ hairColor: item.value });
    }

    // Deduct points
    useUserStore.setState((state) => ({
      points: state.points - item.price,
    }));

    // Check for achievements
    const achievements = useAchievementsStore.getState().achievements;
    const unlockAchievement = useAchievementsStore.getState().unlockAchievement;

    // First purchase achievement
    if (!achievements.find((a) => a.id === "first-purchase")?.unlocked) {
      unlockAchievement("first-purchase");
    }

    // Fashion lover achievement
    const purchasedClothes = items.filter(
      (i) =>
        i.purchased &&
        (i.type === "topColor" ||
          i.type === "bottomColor" ||
          i.type === "shoeColor"),
    );
    if (purchasedClothes.length >= 5) {
      unlockAchievement("fashion-lover");
    }
  };

  return (
    <Scaffold title="Магазин" backButtonTo="/">
      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <div
                className="h-6 w-6 rounded-full"
                style={{ backgroundColor: item.value }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Цена: {item.price} очков
            </p>
            <Button
              onClick={() => handlePurchase(item.id)}
              disabled={item.purchased || points < item.price}
              className="mt-4 w-full"
            >
              {item.purchased ? "Куплено" : "Купить"}
            </Button>
          </div>
        ))}
      </div>
      <div className="fixed bottom-4 right-4 rounded-full bg-primary px-4 py-2 text-primary-foreground">
        Очки: {points}
      </div>
    </Scaffold>
  );
}
