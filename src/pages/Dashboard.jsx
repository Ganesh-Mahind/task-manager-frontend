import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext.jsx";
import { LogOut, PlusCircle, CheckCircle, Circle, ClipboardList, Clock, CheckCheck, Trash2, RotateCcw, Edit2, X, Save } from "lucide-react";

export default function Dashboard() {
  const { token, setToken } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [filter, setFilter] = useState("all");
  const [isCreating, setIsCreating] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  


  const headers = { Authorization: `Bearer ${token}` };

  const loadTasks = async () => {
    const res = await api.get("/tasks", { headers });
    setTasks(res.data);
  };

  useEffect(() => { loadTasks(); }, []);

  const createTask = async () => {
    if (!title) return;
    setIsCreating(true);
    await api.post("/tasks", { title, description: desc }, { headers });
    setTitle(""); setDesc("");
    setIsCreating(false);
    loadTasks();
  };

  const toggleStatus = async (task) => {
    await api.put(`/tasks/${task._id}`,
      { status: task.status === "Pending" ? "Completed" : "Pending" },
      { headers });
    loadTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`, { headers });
    loadTasks();
  };

  const startEdit = (task) => {
    setEditingTask(task._id);
    setEditTitle(task.title);
    setEditDesc(task.description || "");
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditTitle("");
    setEditDesc("");
  };

  const saveEdit = async (taskId) => {
    if (!editTitle) return;
    await api.put(`/tasks/${taskId}`,
      { title: editTitle, description: editDesc },
      { headers });
    setEditingTask(null);
    setEditTitle("");
    setEditDesc("");
    loadTasks();
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    window.location.href = "/";
  };

  const filtered = tasks.filter(t =>
    filter === "all" ? true : t.status === filter
  );

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === "Pending").length,
    completed: tasks.filter(t => t.status === "Completed").length
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-emerald-50">
      
      <div className="max-w-6xl mx-auto p-6">
        
        
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
          
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
              <p className="text-sm text-gray-600">Manage your tasks efficiently</p>
            </div>

          </div>
          <button onClick={logout} 
            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-300 border border-red-200">
            <LogOut size={18} /> Logout
          </button>
        </div>

    
       <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-xl flex-shrink-0">
                <ClipboardList className="w-5 h-5 text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                <p className="text-xs text-gray-600 truncate">Total Tasks</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-xl flex-shrink-0">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
                <p className="text-xs text-gray-600 truncate">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-xl flex-shrink-0">
                <CheckCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-gray-800">{stats.completed}</p>
                <p className="text-xs text-gray-600 truncate">Completed</p>
              </div>
            </div>
          </div>
        </div>


        <div className="bg-white rounded-3xl p-6 border border-gray-200 mb-8 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 bg-emerald-500 rounded-xl">
              <PlusCircle className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Create New Task</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Task Title
                <span className="text-red-500">*</span>
              </label>
              <input 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                placeholder="Enter task title..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300"
              />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Description
                <span className="text-gray-500 text-xs font-normal">(optional)</span>
              </label>
              <textarea 
                value={desc} 
                onChange={e => setDesc(e.target.value)}
                placeholder="Add a description for your task..."
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 resize-none"
              />
            </div>

            <button 
              onClick={createTask}
              disabled={!title || isCreating}
              className="w-full sm:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              {isCreating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5" />
                  Add Task
                </>
              )}
            </button>
          </div>
        </div>

       
        <div className="flex gap-2 mb-6 p-1 bg-white rounded-2xl border border-gray-200 w-fit shadow-sm">
          {[
            { key: "all", label: "All Tasks", icon: ClipboardList },
            { key: "Pending", label: "Pending", icon: Clock },
            { key: "Completed", label: "Completed", icon: CheckCheck }
          ].map(f => (
            <button 
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === f.key 
                  ? "bg-emerald-500 text-white shadow-sm" 
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <f.icon className="w-4 h-4" />
              {f.label}
            </button>
          ))}
        </div>

 
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <ClipboardList className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500">No tasks found</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(task => (
              <div 
                key={task._id}
                className={`group bg-white rounded-2xl p-5 border transition-all duration-300 hover:shadow-md ${
                  task.status === "Completed" 
                    ? "border-emerald-200" 
                    : "border-gray-200"
                }`}
              >
                {editingTask === task._id ? (
           
                  <div className="space-y-3">
                    <input
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      placeholder="Task title"
                    />
                    <textarea
                      value={editDesc}
                      onChange={e => setEditDesc(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                      placeholder="Description"
                      rows={2}
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => saveEdit(task._id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-all"
                      >
                        <Save className="w-4 h-4" /> Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (

                  <>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className={`font-semibold text-gray-800 ${task.status === "Completed" ? "line-through opacity-60" : ""}`}>
                        {task.title}
                      </h3>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        task.status === "Completed" 
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200" 
                          : "bg-amber-50 text-amber-600 border border-amber-200"
                      }`}>
                        {task.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {task.description || "No description"}
                    </p>

                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                      <button 
                        onClick={() => toggleStatus(task)}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          task.status === "Pending"
                            ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200"
                            : "bg-amber-50 hover:bg-amber-100 text-amber-600 border border-amber-200"
                        }`}
                      >
                        {task.status === "Pending" ? (
                          <>
                            <CheckCircle className="w-4 h-4" /> Complete
                          </>
                        ) : (
                          <>
                            <RotateCcw className="w-4 h-4" /> Undo
                          </>
                        )}
                      </button>
                      <button 
                        onClick={() => startEdit(task)}
                        className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all duration-300 border border-blue-200"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteTask(task._id)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-300 border border-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}