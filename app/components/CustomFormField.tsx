import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { UseFormReturn, Path, Controller } from "react-hook-form";

interface FormFieldProps<T extends Record<string, any>> {
  label: string;
  placeholder: string;
  type: Path<T>;
  form: UseFormReturn<T, any, undefined>;
}

const CustomFormField = <T extends Record<string, any>>({
  label,
  placeholder,
  type,
  form,
}: FormFieldProps<T>) => (
  <Controller
    control={form.control}
    name={type}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        <FormControl>
          <Input
            className="input"
            type={type}
            placeholder={placeholder}
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default CustomFormField;
