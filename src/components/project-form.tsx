import Input from './input.tsx';
import {Project} from '../models/project.model.ts';
import {useState} from 'react';
import dayjs from 'dayjs';
import {useProjectContext} from '../contexts/project-details-context.tsx';

interface ProjectFormProps {
    onEditComplete: () => void;
}

const ProjectForm = ({onEditComplete}: ProjectFormProps) => {
    const {project, setLoading} = useProjectContext();
    const [updatedProject, setUpdatedProject] = useState<Project>(project as Project);

    const setValue = (fieldName: string, value: string) => {
        setUpdatedProject(proj => {
            return {
                ...proj,
                [fieldName]: value
            };
        })
    }

    const onSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        fetch(`https://ap-react.azurewebsites.net/projects/${project!.id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedProject),
            headers: {
                "Content-Type": 'application/json'
            }
        }).then((res) => res.json() )
            .then(() => {
            }).finally(() => {
            setLoading(false);
            onEditComplete()
        })
    }

    return <form className='flex flex-col space-y-4'>
        <Input onUpdate={(val) => setValue('name', val)} placeholder='Project Name' defaultValue={project!.name} name='name' />
        <Input onUpdate={(val) => setValue('description', val)} placeholder='Description' defaultValue={project!.description} name='description' />
        <Input type='date' onUpdate={(val) => setValue('startDate', val)} placeholder='Start Date' defaultValue={dayjs(updatedProject?.startDate).format('YYYY-MM-DD')} name='startDate' />
        <Input type='date' onUpdate={(val) => setValue('endDate', val)} placeholder='End Date' defaultValue={dayjs(updatedProject?.endDate).format('YYYY-MM-DD')} name='endDate' />
        <button onClick={(e) => onSave(e)} className='bg-blue-500 px-4 py-2 text-white rounded-md'>Save</button>
    </form>
}

export default ProjectForm;
