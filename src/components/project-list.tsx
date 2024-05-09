import ProjectListItem from "./project-list-item";
import Input from "./input";
import {useEffect, useState} from "react";
import { Project } from "../models/project.model";
import { Outlet } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import {ProjectDetailsContextProvider} from '../contexts/project-details-context.tsx';

const ProjectList = () => {
  const [filter, setFilter] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ filter: filter });
    setLoading(true);
    fetch(`https://ap-react.azurewebsites.net/projects?query=${filter}`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div className="flex flex-row">
      <div className="border border-1 border-blue-500">
        <Input placeholder="Search..." onUpdate={(val) => setFilter(val)} />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {projects.map((project, index) => (
              <ProjectListItem
                key={project.id}
                index={index}
                project={project}
              />
            ))}
          </>
        )}
      </div>
      <div>
          <ProjectDetailsContextProvider>
            <Outlet />
          </ProjectDetailsContextProvider>
      </div>
    </div>
  );
};

export default ProjectList;
