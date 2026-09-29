import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Download,
  FileText,
} from "lucide-react";

import { projects } from "../data/reportData";

const ProjectTable = () => {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.projectName.toLowerCase().includes(search.toLowerCase()) ||
        project.teamLeader.toLowerCase().includes(search.toLowerCase());

      const matchesDomain =
        domain === "All" || project.domain === domain;

      const matchesStatus =
        status === "All" || project.status === status;

      return matchesSearch && matchesDomain && matchesStatus;
    });
  }, [search, domain, status]);

  const getStatusClass = (status) => {
    switch (status) {
      case "On Track":
        return "bg-green-100 text-green-700";

      case "Completed":
      case "Near Completion":
        return "bg-blue-100 text-blue-700";

      case "Delayed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Project Reports
            </h2>

            <p className="text-sm text-gray-500">
              Monitor all internship projects and their progress.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-lg bg-[#2F6E5F] px-4 py-2 text-white transition hover:bg-[#25594D]">
            <Download size={18} />
            Export Report
          </button>

        </div>

        {/* Filters */}

        <div className="mt-6 grid gap-4 lg:grid-cols-4">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search Project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-[#2F6E5F] focus:outline-none"
            />

          </div>

          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2"
          >
            <option>All</option>
            <option>MERN Stack</option>
            <option>React.js</option>
            <option>Node.js</option>
            <option>Python (Django)</option>
            <option>Java</option>
            <option>Flutter</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2"
          >
            <option>All</option>
            <option>On Track</option>
            <option>Completed</option>
            <option>Near Completion</option>
            <option>Delayed</option>
            <option>In Progress</option>
          </select>

          <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 hover:bg-gray-100">
            <Filter size={18} />
            More Filters
          </button>

        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr className="text-left text-sm font-semibold text-gray-600">

              <th className="px-6 py-4">Project</th>
              <th className="px-6 py-4">Domain</th>
              <th className="px-6 py-4">Leader</th>
              <th className="px-6 py-4">Team</th>
              <th className="px-6 py-4">Progress</th>
              <th className="px-6 py-4">Deadline</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredProjects.map((project) => (

              <tr
                key={project.id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >

                <td className="px-6 py-4">

                  <div>

                    <p className="font-semibold text-gray-800">
                      {project.projectName}
                    </p>

                    <p className="text-sm text-gray-500">
                      {project.id}
                    </p>

                  </div>

                </td>

                <td className="px-6 py-4">
                  {project.domain}
                </td>

                <td className="px-6 py-4">
                  {project.teamLeader}
                </td>

                <td className="px-6 py-4">
                  {project.teamSize}
                </td>

                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div className="h-2 w-28 rounded-full bg-gray-200">

                      <div
                        className="h-2 rounded-full bg-[#2F6E5F]"
                        style={{
                          width: `${project.progress}%`,
                        }}
                      />

                    </div>

                    <span className="font-medium">
                      {project.progress}%
                    </span>

                  </div>

                </td>

                <td className="px-6 py-4">
                  {project.deadline}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-2">

                    <button className="rounded-lg p-2 hover:bg-gray-100">
                      <Eye size={18} />
                    </button>

                    <button className="rounded-lg p-2 hover:bg-gray-100">
                      <FileText size={18} />
                    </button>

                    <button className="rounded-lg p-2 hover:bg-gray-100">
                      <Download size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </section>
  );
};

export default ProjectTable;