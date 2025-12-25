import { useState } from "react";

export default function App() {
  // DATA PROJECT
  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Website portfolio menggunakan React",
      category: "Web",
    },
    {
      id: 2,
      title: "UI Design App",
      description: "Desain UI aplikasi mobile",
      category: "UI",
    },
    {
      id: 3,
      title: "Weather App",
      description: "Aplikasi cuaca dengan API",
      category: "Web",
    },
    {
      id: 4,
      title: "Mobile App",
      description: "Aplikasi Android sederhana",
      category: "Mobile",
    },
    {
      id: 5,
      title: "Backend API",
      description: "REST API menggunakan Node.js",
      category: "Backend",
    },
    {
      id: 6,
      title: "Express.js",
      description: "membuat server dengan express.js",
      category: "Backend",
    },
    {
      id: 7,
      title: "Todo List",
      description: "mencatat kegiatan sehari-hari",
      category: "Web",
    },
    {
      id: 8,
      title: "Portofolio",
      description: "Portofolio sederhana saja",
      category: "UI",
    },
    {
      id: 9,
      title: "Flutter",
      description: "Membuat aplikasi mobile Menggunakan Flutter",
      category: "Mobile",
    },
  ];

  // STATE FILTER
  const [filter, setFilter] = useState("All");

  // CATEGORY OTOMATIS DARI DATA
  const categories = ["All", ...new Set(projects.map(p => p.category))];

  // DATA YANG DITAMPILKAN
  const filteredProjects =
    filter === "All"
      ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-10">
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-8">
        My React Projects
      </h1>

      {/* FILTER CATEGORY */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full transition-all
              ${
                filter === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PROJECT LIST */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 rounded-xl p-6 shadow-lg
                       hover:shadow-2xl hover:-translate-y-2 hover:b
                       transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">
              {project.title}
            </h3>

            <p className="text-gray-400 mb-4">
              {project.description}
            </p>

            <span className="inline-block text-sm px-3 py-1
                             bg-gray-700 rounded-full">
              {project.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
