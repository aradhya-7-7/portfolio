import { useState, useEffect } from "react";
import ProjectModal from "./ProjectModal";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Projects = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-[1px] sm:gap-[2px] md:gap-[3px]">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="aspect-square relative group cursor-pointer"
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-4 sm:gap-6">
                <span className="flex items-center text-sm sm:text-base">
                  <i className="far fa-heart mr-1 sm:mr-2"></i>
                  {project.likes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          isMobile={isMobileDevice}
        />
      )}
    </>
  );
};

export default Projects;
