import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { questionsApi } from "@/api";
import { CreateQuestionPayload } from "@/types";

const QUESTIONS_QUERY_KEY = "questions";

export const useQuestions = () => {
  return useQuery({
    queryKey: [QUESTIONS_QUERY_KEY],
    queryFn: questionsApi.getQuestions,
  });
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateQuestionPayload) =>
      questionsApi.createQuestion(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUESTIONS_QUERY_KEY] });
    },
  });
};
