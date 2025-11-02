import { motion } from 'framer-motion';

const LocationIllustration = () => {
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate="visible"
    >
      {/* Fondo */}
      <rect width="100%" height="100%" fill="#f5f7ff" />

      {/* Pin de ubicación */}
      <motion.circle
        cx="300"
        cy="180"
        r="80"
        fill="#8e44ad"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <motion.circle
        cx="300"
        cy="180"
        r="30"
        fill="#f39c12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      />

      {/* Hojas detrás del pin */}
      <path d="M280 100 C270 70, 310 70, 300 100 Z" fill="#2ecc71" />
      <path d="M320 100 C310 70, 350 70, 340 100 Z" fill="#27ae60" />

      {/* Persona con laptop */}
      <circle cx="220" cy="300" r="20" fill="#3498db" />
      <rect x="210" y="310" width="20" height="10" fill="#9b59b6" />
      <rect x="200" y="320" width="40" height="10" fill="#34495e" />

      {/* Reloj */}
      <motion.circle
        cx="400"
        cy="320"
        r="25"
        fill="#3498db"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
      <circle cx="400" cy="320" r="10" fill="#f39c12" />
      <line x1="400" y1="320" x2="400" y2="310" stroke="#2c3e50" strokeWidth="2" />
      <line x1="400" y1="320" x2="410" y2="320" stroke="#2c3e50" strokeWidth="2" />

      {/* Avión de papel */}
      <motion.polygon
        points="500,100 520,110 500,120"
        fill="#f39c12"
        initial={{ x: 50, y: -50, rotate: -20 }}
        animate={{ x: 0, y: 0, rotate: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      />
      <path d="M500 110 C480 130, 460 150, 440 170" stroke="#8e44ad" strokeDasharray="4" fill="none" />

      {/* Decorativos */}
      <circle cx="150" cy="100" r="5" fill="#f39c12" />
      <circle cx="450" cy="80" r="5" fill="#8e44ad" />
    </motion.svg>
  );
};

export default LocationIllustration;

