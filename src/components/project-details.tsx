import { useParams } from "react-router-dom";
import {useCallback, useState} from "react";
import { useEffect } from "react";
import ProjectDisplay from './project-display.tsx';
import ProjectForm from './project-form.tsx';
import {useProjectContext} from '../contexts/project-details-context.tsx';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const {setProject, project, setLoading, isLoading} = useProjectContext();
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
    return <ProjectForm key={projectId} onEditComplete={() => {
      setEditMode(false);
      fetchProject()
    }} />
  } else {
    return <ProjectDisplay key={projectId} onEdit={() => setEditMode(true)} />
  }
};

export default ProjectDetails;
