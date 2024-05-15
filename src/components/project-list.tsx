import ProjectListItem from "./project-list-item";
import Input from "./input";
import {useState} from "react";
import { Outlet } from "react-router-dom";
import {ProjectDetailsContextProvider} from '../contexts/project-details-context.tsx';
import {fetchProjects} from '../services/project-service.ts';
import {useQuery} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';

const ProjectList = () => {
  const [filter, setFilter] = useState<string>("");
  const {t, i18n} = useTranslation();
  const {data: projects, isLoading} = useQuery({
      queryKey: ['ProjectList', filter],
      queryFn: () => fetchProjects(filter),
      staleTime: 10000,
      meta: {
          showNotification: true,
          operationName:"Fetch Project List"
      }
  });


  return (
    <div className="flex flex-row">
      <div className="border border-1 border-blue-500">
        <Input placeholder="Search..." onUpdate={(val) => setFilter(val)} />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {projects?.map((project, index) => (
              <ProjectListItem
                key={project.id}
                index={index}
                project={project}
              />
            ))}
          </>
        )}
          {t('projects.title')}
          <button className='bg-blue-500 px-4 py-2 text-white rounded-md' onClick={() => i18n.changeLanguage(i18n.language === 'tr' ? 'en' : 'tr')}>Edit</button>
      </div>
        <div>
            <ProjectDetailsContextProvider>
                <Outlet/>
            </ProjectDetailsContextProvider>
      </div>
    </div>
  );
};

export default ProjectList;
