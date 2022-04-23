// FEATURE: Jordon: Retrieve API data, and throw into a database and cache for x time, to prevent client rate limiting?
// TODO: Jordon: Make a proper response.status === 403. Alerting the user of limit via RateLimit Component.
import axios from "axios";
import React from "react";
import { useMemo } from "react";
import RateLimit from "./rateLimit";

const Projects = () => {
  const [projects, setProjects] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const endpoints = useMemo(
    () => [
      "https://api.github.com/users/CDCGov/repos?page=1&per_page=100",
      "https://api.github.com/users/CDCGov/repos?page=2&per_page=100",
      "https://api.github.com/users/CDCGov/repos?page=3&per_page=100",
      "https://api.github.com/users/CDCGov/repos?page=4&per_page=100",
    ],
    []
  );

  axios.all(endpoints.map((endpoint) => axios.get(endpoint)));

  React.useEffect(() => {
    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .catch((error) => {
        setErrorMessage(error);
      })
      .then(
        axios.spread((...responses) => {
          setProjects([
            ...responses[0].data,
            ...responses[1].data,
            ...responses[2].data,
            ...responses[3].data,
          ]);
        })
      );
  }, [endpoints]);

  return (
    <div className="projects">
      {errorMessage !== null && <RateLimit />}
      <div className="relative bg-white pt-5 pb-20 px-4 sm:px-6 lg:pt-8 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-700">
                      {project.language}
                    </p>
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:underline"
                    >
                      <p className="text-xl font-semibold text-gray-900">
                        {project.name}
                      </p>
                    </a>
                    <p className="mt-3 text-base text-gray-600">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        <a href={project.language} className="hover:underline">
                          {project.full_name}
                        </a>
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <p>{project.created_at}</p>
                        <span aria-hidden="true"> </span>
                        <a
                          href={project.html_url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-black"
                        >
                          View Code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Projects;