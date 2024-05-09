import {useSelector} from 'react-redux';
import {selectCurrentProject} from '../store/projects/projectSelectors.ts';

export interface ProjectDisplayProps {
    onEdit: () => void;
}
const ProjectDisplay = ({onEdit}: ProjectDisplayProps) => {
    const project = useSelector(selectCurrentProject());
    return <><div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
        <div className="font-bold text-xl mb-2">{project?.name}</div>
        <p className="text-gray-700 text-base">{project?.description}</p>
        <div className="pt-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Start: {new Date(project!.startDate).toLocaleDateString()}
        </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          End: {new Date(project!.endDate).toLocaleDateString()}
        </span>
        </div>
    </div>
        <div className='w-full'>
            <button className='bg-blue-500 px-4 py-2 text-white rounded-md' onClick={() => onEdit()}>Edit</button>
        </div>
        </>
}

export default ProjectDisplay
