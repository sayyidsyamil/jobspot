import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";

const FormSchema = z.object({
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});

type MagicNumberProps = {
  onChange: (phone: string) => void;
};

export default function MagicNumber({ onChange }: MagicNumberProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "+60",
    },
  });

  return (
    <Form {...form}>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start ">
              <FormLabel className="text-left">Phone Number</FormLabel>
              <FormControl className="w-full ">
                <PhoneInput
                  placeholder="Enter a phone number"
                  {...field}
                  onChange={(value) => {
                    field.onChange(value);
                    onChange(value); // Notify parent of the change
                  }}
                />
              </FormControl>
              <FormDescription className="text-left">
                Enter a phone number
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
    </Form>
  );
}
