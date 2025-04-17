import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { QuestionFormValues, questionFormSchema } from "@/schemas/question";
import { useCreateQuestion } from "@/hooks/questions.ts";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Label } from "@/components/ui/label.tsx";

type Props = {
  onSubmit?: () => void;
};

export function QuestionForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      title: "",
      description: "",
      forecast: 0,
    },
  });

  const { mutate, isPending } = useCreateQuestion();

  const handleValidatedSubmit = (data: QuestionFormValues) => {
    mutate(data);
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit(handleValidatedSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Title
        </Label>
        <Input
          id="title"
          {...register("title")}
          className="border-input bg-background w-full rounded-md border px-3 py-2"
          placeholder="Enter question title"
        />
        {errors.title && (
          <p className="text-destructive text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Description
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          className="border-input bg-background min-h-24 w-full rounded-md border px-3 py-2"
          placeholder="Enter question description"
        />
        {errors.description && (
          <p className="text-destructive text-sm">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="forecast" className="text-sm font-medium">
          Forecast
        </Label>
        <Input
          id="forecast"
          type="number"
          {...register("forecast", { valueAsNumber: true })}
          className="border-input bg-background w-full rounded-md border px-3 py-2"
          placeholder="Enter forecast value"
        />
        {errors.forecast && (
          <p className="text-destructive text-sm">{errors.forecast.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Saving..." : "Create Question"}
      </Button>
    </form>
  );
}
