import { useParams } from "react-router-dom";
import {useCallback, useState} from "react";
import { useEffect } from "react";
import ProjectDisplay from './project-display.tsx';
import ProjectForm from './project-form.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentProject, selectIsLoading} from '../store/projects/projectSelectors.ts';
import {setLoading, setProject} from '../store/projects/projectSlice.ts';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const isLoading = useSelector(selectIsLoading());
  const project = useSelector(selectCurrentProject());
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);

  const fetchProject = useCallback(() => {
    dispatch(setLoading(true))
    fetch(`https://ap-react.azurewebsites.net/projects/${projectId}`)
        .then((res) => res.json())
        .then((data) => dispatch(setProject(data)))
        .finally(() => {
          dispatch(setLoading(false));
        });
  }, [projectId])

  useEffect(() => {
    fetchProject()
  }, [fetchProject, projectId]);

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
