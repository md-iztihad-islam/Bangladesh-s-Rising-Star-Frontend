import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <motion.img
        src="/logo.png" // Make sure your logo is in the public folder
        alt="Logo Loader"
        className="w-50 h-50"
        animate={{
          scale: [1, 1.3, 1], // Scaling animation
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default Loader;
