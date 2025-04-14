import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { useShopStore, type ShopItem } from "@/model/shop/shopStore";
import { useAvatarStore } from "@/model/avatar/avatarStore";

export default function PurchasedItemsDrawer() {
  const items = useShopStore((s) => s.items);
  const updateAvatar = useAvatarStore((s) => s.updateAvatar);
  const avatar = useAvatarStore((s) => s.avatar);

  const purchasedItems = items.filter((item) => item.purchased);

  const handleApplyItem = (item: ShopItem) => {
    switch (item.type) {
      case "skinColor":
        updateAvatar({ skinColor: item.value });
        break;
      case "hairColor":
        updateAvatar({ hairColor: item.value });
        break;
      case "topColor":
        updateAvatar({
          topColor: item.value,
          isTShirt: item.variant === "tshirt",
        });
        break;
      case "bottomColor":
        updateAvatar({ bottomColor: item.value });
        break;
      case "shoeColor":
        updateAvatar({ shoeColor: item.value });
        break;
    }
  };

  const isItemActive = (item: ShopItem) => {
    switch (item.type) {
      case "skinColor":
        return avatar.skinColor === item.value;
      case "hairColor":
        return avatar.hairColor === item.value;
      case "topColor":
        return (
          avatar.topColor === item.value &&
          avatar.isTShirt === (item.variant === "tshirt")
        );
      case "bottomColor":
        return avatar.bottomColor === item.value;
      case "shoeColor":
        return avatar.shoeColor === item.value;
      default:
        return false;
    }
  };

  if (purchasedItems.length === 0) return null;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          Мои покупки
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Купленные предметы</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <div className="grid gap-4">
              {purchasedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-6 w-6 rounded-full"
                      style={{ backgroundColor: item.value }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <Button
                    variant={isItemActive(item) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleApplyItem(item)}
                  >
                    {isItemActive(item) ? "Надето" : "Надеть"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
