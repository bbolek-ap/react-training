import { useParams } from "react-router-dom";
import {useState} from "react";
import ProjectDisplay from './project-display.tsx';
import ProjectForm from './project-form.tsx';
import useProjectData from '../hooks/useProjectData.tsx';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [editMode, setEditMode] = useState<boolean>(false);
  const {isLoading, data: project} = useProjectData(projectId);

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!project) {
    return <div>Project Not Found!</div>;
  }

  if (editMode) {
    return <ProjectForm key={projectId} projectId={projectId} onEditComplete={() => {
      setEditMode(false);
    }} />
  } else {
    return <ProjectDisplay key={projectId} projectId={projectId} onEdit={() => setEditMode(true)} />
  }
};

export default ProjectDetails;
