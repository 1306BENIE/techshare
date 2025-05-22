import React from "react";
import { User } from "@/interfaces/user";
import { UserController } from "@/controllers/user.controller";

interface EditUserFormProps {
  user: User;
}

export function EditUserForm({ user }: EditUserFormProps) {
  const userController = new UserController();

  async function updateUser(formData: FormData) {
    "use server";

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      address: {
        street: formData.get("street"),
        city: formData.get("city"),
        postalCode: formData.get("postalCode"),
        country: formData.get("country"),
      },
    };

    try {
      await userController.updateUser(user._id, data);
      // Rediriger vers la page de profil après la mise à jour
      // Note: La redirection doit être gérée côté client
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  return (
    <form action={updateUser} className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              Prénom
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              defaultValue={user.firstName}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Nom
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              defaultValue={user.lastName}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={user.email}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Numéro de téléphone
          </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            defaultValue={user.phoneNumber}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Adresse</h3>
          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700"
            >
              Rue
            </label>
            <input
              type="text"
              name="street"
              id="street"
              defaultValue={user.address.street}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                Ville
              </label>
              <input
                type="text"
                name="city"
                id="city"
                defaultValue={user.address.city}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-gray-700"
              >
                Code postal
              </label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                defaultValue={user.address.postalCode}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Pays
            </label>
            <input
              type="text"
              name="country"
              id="country"
              defaultValue={user.address.country}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </form>
  );
}
