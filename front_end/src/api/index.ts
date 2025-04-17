import axios from "axios";
import { CreateQuestionPayload, Question } from "@/types";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const questionsApi = {
  getQuestions: async (): Promise<Question[]> => {
    const response = await api.get<Question[]>("/questions/");
    return response.data;
  },

  createQuestion: async (payload: CreateQuestionPayload): Promise<Question> => {
    const response = await api.post<Question>("/questions/", payload);
    return response.data;
  },
};

export default api;
