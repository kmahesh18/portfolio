import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-[90%] h-[90vh] bg-[#111111] rounded-xl p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-purple-500 transition-colors"
          >
            <IoClose size={24} />
          </button>
          <object
            data="/resume.pdf"
            type="application/pdf"
            className="w-full h-full rounded-lg"
          >
            <div className="text-white text-center p-4">
              <p>Unable to display PDF. You can 
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:text-purple-400 ml-1"
                >
                  download it here
                </a>.
              </p>
            </div>
          </object>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResumeModal; 