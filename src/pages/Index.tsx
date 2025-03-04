
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Todo List</CardTitle>
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
            <Button onClick={addTodo}>Add</Button>
          </div>

          <div className="space-y-3">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center justify-between p-3 rounded-md border cursor-pointer transition-colors ${
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
