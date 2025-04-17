import { QuestionsTable } from "./components/QuestionsTable";
import { QuestionModal } from "./components/QuestionModal";

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Questions</h1>
        <QuestionModal />
      </div>
      <QuestionsTable />
    </div>
  );
}

export default App;
