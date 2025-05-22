"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpSchema, type SignUpInput } from "@/lib/validations/auth";
import { AUTH_ERRORS } from "@/constants/auth/errors";
import {
  AnimatedContainer,
  AnimatedForm,
  AnimatedInput,
  AnimatedButton,
} from "@/components/ui/AnimatedContainer";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  const [formData, setFormData] = useState<SignUpInput>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isAddress = false
  ) => {
    const { name, value } = e.target;
    if (isAddress) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Valider les données avec Zod
      const validatedData = signUpSchema.parse(formData);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Rediriger vers la page de connexion avec un message de succès
      router.push(
        "/auth/signin?message=Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter."
      );
    } catch (err: any) {
      if (err.errors) {
        // Erreur de validation Zod
        setError(err.errors[0].message);
      } else {
        setError(err.message || AUTH_ERRORS.SERVER_ERROR);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AnimatedContainer className="absolute top-4 left-4">
        <Link href="/" className="text-blue-600 hover:text-blue-500">
          ← Retour à l'accueil
        </Link>
      </AnimatedContainer>

      <AnimatedContainer className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          TechShare
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Créez votre compte
        </p>
      </AnimatedContainer>

      <AnimatedContainer className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <AnimatedForm className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              >
                {error}
              </motion.div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <AnimatedInput>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Prénom
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </AnimatedInput>

              <AnimatedInput>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </AnimatedInput>
            </div>

            <AnimatedInput>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
              />
            </AnimatedInput>

            <AnimatedInput>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Numéro de téléphone
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </AnimatedInput>

            <AnimatedContainer className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Adresse</h3>

              <AnimatedInput>
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rue
                </label>
                <input
                  id="street"
                  name="street"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.address.street}
                  onChange={(e) => handleChange(e, true)}
                />
              </AnimatedInput>

              <div className="grid grid-cols-2 gap-4">
                <AnimatedInput>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ville
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.address.city}
                    onChange={(e) => handleChange(e, true)}
                  />
                </AnimatedInput>

                <AnimatedInput>
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Code postal
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.address.postalCode}
                    onChange={(e) => handleChange(e, true)}
                  />
                </AnimatedInput>
              </div>

              <AnimatedInput>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pays
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.address.country}
                  onChange={(e) => handleChange(e, true)}
                />
              </AnimatedInput>
            </AnimatedContainer>

            <AnimatedInput>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.password}
                onChange={handleChange}
              />
            </AnimatedInput>

            <AnimatedInput>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </AnimatedInput>

            <AnimatedButton
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Chargement..." : "S'inscrire"}
            </AnimatedButton>
          </AnimatedForm>

          <AnimatedContainer className="mt-6 text-center text-sm text-gray-600">
            Déjà un compte ?{" "}
            <Link
              href="/auth/signin"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Se connecter
            </Link>
          </AnimatedContainer>
        </div>
      </AnimatedContainer>
    </div>
  );
}
