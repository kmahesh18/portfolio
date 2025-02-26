import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleResumeClick = () => {
    window.open("https://drive.google.com/file/d/19FSSKoDYYVzD-LVAL_kRFftf_x5XHfrP/view?usp=drive_link", "_blank");
    onClose();
  };

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
          className="relative w-[90%] h-auto bg-[#111111] rounded-xl p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-purple-500 transition-colors"
          >
            <IoClose size={24} />
          </button>
          
          <div className="text-white text-center">
            <h2 className="text-2xl mb-4">View Resume</h2>
            <p className="mb-6">Click below to view my resume on Google Drive</p>
            <button
              onClick={handleResumeClick}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Open Resume
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResumeModal; 