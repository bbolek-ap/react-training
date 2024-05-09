import { Project } from "../models/project.model";
import { Link } from "react-router-dom";

export interface ProjectListItemProps {
  project: Project;
  index: number;
}
const ProjectListItem = ({ project, index }: ProjectListItemProps) => {
  return (
    <div>
      <Link className="pt-2" to={`/projects/${project.id}`}>
        {index} - {project.name}
      </Link>
    </div>
  );
};

export default ProjectListItem;
