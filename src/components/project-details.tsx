import { useParams } from "react-router-dom";
import { Project } from "../models/project.model";
import {useCallback, useState} from "react";
import { useEffect } from "react";
import ProjectDisplay from './project-display.tsx';
import ProjectForm from './project-form.tsx';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project>();
  const [isLoading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const fetchProject = useCallback(() => {
    setLoading(true);
    fetch(`https://ap-react.azurewebsites.net/projects/${projectId}`)
        .then((res) => res.json())
        .then((data) => setProject(data))
        .finally(() => {
          setLoading(false);
        });
  }, [projectId])

  useEffect(() => {
    fetchProject()
  }, [projectId]);

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!project) {
    return <div>Project Not Found!</div>;
  }

  if (editMode) {
    return <ProjectForm key={projectId} project={project} onEditComplete={() => {
      setEditMode(false);
      fetchProject()
    }} />
  } else {
    return <ProjectDisplay key={projectId} project={project} onEdit={() => setEditMode(true)} />
  }
};

export default ProjectDetails;
