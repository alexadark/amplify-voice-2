'use client';

import React, { useRef, useState } from 'react';
import SubmitProjectForm from '@/app/components/submit-project-form';
import { storyblokEditable } from '@storyblok/react/rsc';
import { BorderButton } from '@/app/components/ui/tailwindcss-buttons';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface SubmitFormProps {
  blok: {
    _uid: string;
    title: string;
    image: {
      filename: string;
      alt?: string;
    };
    description: string;
  };
}

const SubmitForm = ({ blok }: SubmitFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, () => setIsModalOpen(false));

  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="space-y-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold">{blok.title}</h2>
        <img
          src={blok.image.filename}
          alt={blok.image.alt || blok.title}
          className="w-full h-auto rounded-lg shadow-lg"
        />
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          {blok.description}
        </p>
        <div className="flex justify-center">
          <BorderButton
            label="Submit Project"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                duration: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              {' '}
              <AnimatePresence>
                {isModalOpen && (
                  <div key="modal-wrapper">
                    <motion.div
                      key="modal-backdrop"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                      onClick={() => setIsModalOpen(false)}
                    />
                    <motion.div
                      key="modal-content"
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      transition={{
                        duration: 0.2,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="fixed inset-0 flex items-center justify-center z-50 p-4"
                    >
                      <div
                        ref={modalRef}
                        className="bg-black border border-neutral-800 p-6 rounded-lg shadow-xl w-full max-w-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <motion.button
                          key="modal-close-button"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ delay: 0.1 }}
                          onClick={() => setIsModalOpen(false)}
                          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-800 transition-colors"
                        >
                          <X className="w-6 h-6 text-neutral-400" />
                        </motion.button>
                        <SubmitProjectForm
                          onClose={() => setIsModalOpen(false)}
                        />
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
              <div
                ref={modalRef}
                className="bg-black border border-neutral-800 p-6 rounded-lg shadow-xl w-full max-w-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  key="modal-close-button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-6 h-6 text-neutral-400" />
                </motion.button>
                <SubmitProjectForm onClose={() => setIsModalOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
export default SubmitForm;
