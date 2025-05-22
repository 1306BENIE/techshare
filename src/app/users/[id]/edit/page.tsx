import React from "react";
import { UserController } from "@/controllers/user.controller";
import { EditUserForm } from "@/components/users/EditUserForm";

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const userController = new UserController();
  const { data: user } = await userController.getUserById(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Modifier le profil</h1>
      <EditUserForm user={user} />
    </div>
  );
}
