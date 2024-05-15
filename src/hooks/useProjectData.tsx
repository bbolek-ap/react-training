import {useQuery} from '@tanstack/react-query';
import {fetchProject} from '../services/project-service.ts';

const useProjectData= (projectId?: string) => {
     const response = useQuery({
        queryKey: ["Project", projectId],
        queryFn: () => fetchProject(projectId as string),
         staleTime: 50000,
         meta: {
             showNotification: true,
             operationName:`Fetch Project Details ${projectId}`
         }
    });

     return response;
}


export default useProjectData;
