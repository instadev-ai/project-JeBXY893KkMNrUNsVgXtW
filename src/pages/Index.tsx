
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, CheckSquare } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    
    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };
    
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click from triggering
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // Count completed tasks
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center p-4">
      {/* Header */}
      <div className="w-full max-w-md mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <CheckSquare className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-blue-700">Task Manager</h1>
        </div>
        <p className="text-gray-600">Simple and effective task management</p>
      </div>

      <Card className="w-full max-w-md shadow-lg border-t-4 border-t-blue-500">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold">My Tasks</CardTitle>
            <div className="text-sm text-gray-500">
              {completedCount}/{todos.length} completed
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={addTodo}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add
            </Button>
          </div>

          <div className="space-y-3">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No tasks yet. Add one above!</p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  onClick={() => toggleTodo(todo.id)}
                  className={`
                    flex items-center justify-between p-3 rounded-md border
                    ${todo.completed ? "bg-gray-50" : "bg-white"}
                    hover:bg-gray-100 cursor-pointer transition-all
                  `}
                  role="button"
                  tabIndex={0}
                  aria-label={`Mark "${todo.text}" as ${todo.completed ? "incomplete" : "complete"}`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      onClick={(e) => e.stopPropagation()}
                      id={`todo-${todo.id}`}
                    />
                    <span
                      className={`text-sm ${
                        todo.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => deleteTodo(todo.id, e)}
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    aria-label={`Delete "${todo.text}"`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
