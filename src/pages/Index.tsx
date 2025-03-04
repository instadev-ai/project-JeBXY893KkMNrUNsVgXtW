
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, CheckCircle, ListTodo } from "lucide-react";

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
    // Stop propagation to prevent toggling when delete button is clicked
    e.stopPropagation();
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col items-center p-4">
      {/* Header */}
      <div className="w-full max-w-md mb-6 text-center">
        <div className="flex items-center justify-center mb-2">
          <ListTodo className="h-8 w-8 text-indigo-600 mr-2" />
          <h1 className="text-3xl font-bold text-indigo-700">TaskMaster</h1>
        </div>
        <p className="text-gray-600">Stay organized, get things done.</p>
      </div>

      {/* Main Card */}
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-indigo-500">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold text-gray-800">My Tasks</CardTitle>
            <div className="flex items-center text-sm text-gray-500">
              <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
              <span>{completedCount}/{todos.length} completed</span>
            </div>
          </div>
          <CardDescription>Click on a task to mark it as completed</CardDescription>
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
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Add
            </Button>
          </div>

          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ListTodo className="h-12 w-12 mx-auto mb-2 opacity-30" />
                <p>No tasks yet. Add one above!</p>
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center justify-between p-3 rounded-md border cursor-pointer transition-all ${
                    todo.completed 
                      ? "bg-gray-50 border-gray-200" 
                      : "bg-white border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => toggleTodo(todo.id)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      id={`todo-${todo.id}`}
                      // Prevent double toggling when checkbox is clicked directly
                      onClick={(e) => e.stopPropagation()}
                      className={todo.completed ? "border-indigo-500" : ""}
                    />
                    <span
                      className={`text-sm ${
                        todo.completed ? "line-through text-gray-400" : "text-gray-700"
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
