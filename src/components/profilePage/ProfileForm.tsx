import { useUserStore } from "@/model/user/userStore";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { useState } from "react";
import { Check } from "lucide-react";

const formSchema = z.object({
  name: z
    .string({ required_error: "Введите имя" })
    .min(2, { message: "Имя должно быть длиннее 2 символов" })
    .max(30),
  sex: z.enum(["male", "female"]),
  dateOfBirth: z.coerce.date(),
  weight: z.number().min(10).max(300),
  height: z.number().min(10).max(300),
});

export default function ProfileForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { bodyStats, setBodyStats } = useUserStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: bodyStats.name || "",
      sex: bodyStats.sex || "male",
      dateOfBirth: bodyStats.dateOfBirth || new Date(),
      weight: bodyStats.weight || 0,
      height: bodyStats.height || 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setBodyStats(values);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-2 rounded-md bg-background p-4"
      >
        <h2 className="text-xl font-bold">Личные данные</h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Имя" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пол</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">Мужской</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">Женский</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дата рождения</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={
                    field.value instanceof Date
                      ? field.value.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => {
                    field.onChange(
                      e.target.value ? new Date(e.target.value) : null,
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Вес (кг)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(e.target.value ? Number(e.target.value) : 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Рост (см)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(e.target.value ? Number(e.target.value) : 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-4 w-full" type="submit">
          {showSuccess ? (
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Сохранено
            </span>
          ) : (
            "Сохранить изменения"
          )}
        </Button>
      </form>
    </Form>
  );
}
