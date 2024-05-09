import {Project} from '../models/project.model.ts';
import {createContext, useContext, useState} from 'react';


interface ProjectDetailsContextProps {
    project?: Project;
    setProject: (project: Project) => void;
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
}

const defaultContextValue = {
    project: undefined,
    setProject: () => {},
    isLoading: false,
    setLoading: () => {}
}

export const ProjectDetailsContext = createContext<ProjectDetailsContextProps>(defaultContextValue);

interface ProjectDetailsContextProviderProps extends React.PropsWithChildren {

}

export const ProjectDetailsContextProvider = ({children} : ProjectDetailsContextProviderProps) => {
    const [isLoading, setLoading] = useState(false);
    const [project, setProject] = useState<Project>();
    const contextValue = {
        project,
        setProject,
        isLoading,
        setLoading
    }

    return (
        <ProjectDetailsContext.Provider value={contextValue}>
            {children}
        </ProjectDetailsContext.Provider>
    );
};

export const useProjectContext = () => useContext(ProjectDetailsContext);
