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

export default function WelcomeForm({
  onSubmitCallback,
}: {
  onSubmitCallback: () => void;
}) {
  const setBodyStats = useUserStore((state) => state.setBodyStats);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sex: "male",
      dateOfBirth: new Date(),
      weight: 0,
      height: 0,
    },
  });

  function onSubmit({
    name,
    sex,
    dateOfBirth,
    weight,
    height,
  }: z.infer<typeof formSchema>) {
    const data = {
      isFirstTime: false,
      name,
      sex,
      dateOfBirth,
      weight,
      height,
    };
    setBodyStats(data);
    onSubmitCallback();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-xl flex-col gap-2 rounded-md bg-background p-4"
      >
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
          Отправить
        </Button>
      </form>
    </Form>
  );
}
