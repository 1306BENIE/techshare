import { UserController } from "@/controllers/user.controller";
import { UserProfileDetails } from "@/components/users/UserProfileDetails";

export default async function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const userController = new UserController();
  const { data: profile } = await userController.getUserProfile(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <UserProfileDetails profile={profile} />
    </div>
  );
}
