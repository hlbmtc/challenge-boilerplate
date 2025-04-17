import { Question } from "@/types";
import { useQuestions } from "@/hooks/questions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";

export function QuestionsTable() {
  const { data: questions = [], isLoading } = useQuestions();

  if (isLoading) {
    return <div className="py-4 text-center">Loading questions...</div>;
  }

  if (questions.length === 0) {
    return <div className="py-4 text-center">No questions found.</div>;
  }

  return (
    <div className="rounded-md border">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-muted/50 border-b">
            <TableHead className="px-4 py-3 text-left font-medium">
              ID
            </TableHead>
            <TableHead className="px-4 py-3 text-left font-medium">
              Title
            </TableHead>
            <TableHead className="px-4 py-3 text-left font-medium">
              Description
            </TableHead>
            <TableHead className="px-4 py-3 text-left font-medium">
              Forecast
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question) => (
            <QuestionRow key={question.id} question={question} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function QuestionRow({ question }: { question: Question }) {
  return (
    <TableRow className="border-b">
      <TableCell className="px-4 py-3">{question.id}</TableCell>
      <TableCell className="px-4 py-3">{question.title}</TableCell>
      <TableCell className="px-4 py-3">
        <div className="max-w-xs truncate">{question.description}</div>
      </TableCell>
      <TableCell className="px-4 py-3">
        {question.forecast.toFixed(2)}
      </TableCell>
    </TableRow>
  );
}
