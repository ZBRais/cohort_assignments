import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

export default function HelpMe({ isOpen, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  const qrCodeImage = "/helpMeQR.png";
  const upiAddress = "zubayerjpb@ybl";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg text-center max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h2 className="text-lg md:text-xl font-bold text-gray-800">
              I've pending EMI Rs.5000/-
            </h2>
            <img
              src={qrCodeImage}
              alt="QR Code"
              className="my-4 w-40 h-40 md:w-48 md:h-48 mx-auto"
            />
            <p className="text-gray-700 font-semibold text-sm md:text-base">UPI Address:</p>
            <p className="text-lg md:text-xl font-bold text-gray-900 break-all">
              {upiAddress}
            </p>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full md:w-auto"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
