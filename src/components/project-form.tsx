import {Project} from '../models/project.model.ts';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateProject} from '../services/project-service.ts';
import {toast} from 'sonner';
import useProjectData from '../hooks/useProjectData.tsx';
import {FormProvider, useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from './form-input.tsx';
import dayjs from 'dayjs';
import { z } from 'zod';

interface ProjectFormProps {
    onEditComplete: () => void;
    projectId?: string;
}

const ProjectForm = ({onEditComplete, projectId}: ProjectFormProps) => {
    const {data: project} = useProjectData(projectId);
    const queryClient = useQueryClient();

    const validationSchema = z.object({
        name: z.string().min(1, {message: 'Field is Required'}),
        description: z.string().min(3),
        startDate: z.string(),
        endDate: z.string(),
    })
    type validationSchemaType = z.infer<typeof validationSchema>;


    const methods = useForm<validationSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(validationSchema),
        defaultValues: {
            ...project,
            startDate: dayjs(project?.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(project?.endDate).format('YYYY-MM-DD')
        }
    })

    const updateMutation = useMutation({
        mutationFn: (data: Project) => updateProject(data),
        onSuccess: (_, variables) => {
            toast.success('Updated successfully.');
            onEditComplete()
            queryClient.setQueryData(["Project", projectId], {
                ...variables,
            })
        },
        onError: (error) => {
            toast.error('Failed to update project.');
            console.log("updated project error" + error.message);
        }
    })

    const onSave = (data: Project) => {
        updateMutation.mutate(data);
    }

    if (updateMutation.isPending) {
        return <div>Updating...</div>
    }

    return  <FormProvider {...methods}>
                <div className='flex flex-col space-y-4'>
                    <FormInput placeholder='Project Name' name='name' required={true} />
                    <FormInput placeholder='Description'  name='description' />
                    <FormInput type='date' placeholder='Start Date' name='startDate' />
                    <FormInput type='date' placeholder='End Date' name='endDate' />
                    <button onClick={methods.handleSubmit(data => onSave(data))} className='bg-blue-500 px-4 py-2 text-white rounded-md'>Save</button>
                </div>
            </FormProvider>
}

export default ProjectForm;
