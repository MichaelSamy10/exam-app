import { CircleX } from 'lucide-react';

type FormErrorProps = {
  error: Error | null;
};

export default function FormError({
  error,
}: FormErrorProps) {
  return (
    <div className="border border-red-600 bg-red-50 p-2">
      <div className="relative mx-auto">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full p-2">
          <CircleX
            className="fill-white text-red-500"
            width={18}
            height={18}
          />
        </div>
        <p className="text-center text-sm text-red-600">
          {error?.message}
        </p>
      </div>
    </div>
  );
}
