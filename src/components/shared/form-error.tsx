import { CircleX } from "lucide-react";
import { FieldValues, UseFormReturn } from "react-hook-form";

type FormErrorProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
};

export default function FormError<T extends FieldValues>({
  form,
}: FormErrorProps<T>) {
  return (
    <div className="border border-red-600 bg-red-50 p-2">
      <div className="relative mx-auto">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full p-2">
          <CircleX className="text-red-500 fill-white" width={18} height={18} />
        </div>
        <p className="text-red-600 text-center text-sm">
          {form.formState.errors.root?.message}
        </p>
      </div>
    </div>
  );
}
