import { useState } from "react";
import ProjectModal from "./ProjectModal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

const Projects = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-lg"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            <ProjectModal onClose={handleClose} isMobile={isMobileDevice} />
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
