"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ToolFormStep1,
  ToolFormStep2,
  ToolFormStep3,
  useMultiStepToolForm,
} from "./MultiStepToolFormSteps";

export function MultiStepToolForm() {
  const {
    step,
    totalSteps,
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleNext,
    handlePrev,
    handleSubmit,
    isSuccess,
  } = useMultiStepToolForm();

  return (
    <div className="w-full">
      {/* Barre de progression */}
      <div className="flex items-center mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-2 mx-1 rounded-full transition-all duration-300 ${
              i < step
                ? "bg-blue-600"
                : i === step
                ? "bg-blue-400"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <span className="text-5xl mb-4">🎉</span>
            <h2 className="text-2xl font-bold text-blue-700 mb-2">
              Outil ajouté avec succès !
            </h2>
            <p className="text-gray-600 mb-6">
              Merci de contribuer à la communauté TechShare.
            </p>
            <a
              href="/tools"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            >
              Retour à la liste
            </a>
          </motion.div>
        ) : (
          <motion.form
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
            onSubmit={handleSubmit}
          >
            {step === 0 && (
              <ToolFormStep1
                data={formData}
                errors={errors}
                onChange={handleChange}
              />
            )}
            {step === 1 && (
              <ToolFormStep2
                data={formData}
                errors={errors}
                onChange={handleChange}
              />
            )}
            {step === 2 && (
              <ToolFormStep3
                data={formData}
                errors={errors}
                onChange={handleChange}
              />
            )}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 0 || isSubmitting}
                className="px-6 py-2 rounded-lg bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition disabled:opacity-50"
              >
                Précédent
              </button>
              {step < totalSteps - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Création..." : "Créer l'outil"}
                </button>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
