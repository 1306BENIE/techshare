import { UserController } from "@/controllers/user.controller";
import { UserProfile } from "@/components/users/UserProfile";

export default async function UserPage({ params }: { params: { id: string } }) {
  const userController = new UserController();
  const { data: user } = await userController.getUserById(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <UserProfile user={user} />
    </div>
  );
}
