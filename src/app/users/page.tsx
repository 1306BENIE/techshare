import { UserController } from "@/controllers/user.controller";
import { UserList } from "@/components/users/UserList";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const userController = new UserController();

  const filters = {
    search: searchParams.search as string,
    role: searchParams.role as "USER" | "ADMIN",
    isVerified: searchParams.isVerified === "true",
    city: searchParams.city as string,
    country: searchParams.country as string,
    minRating: searchParams.minRating
      ? Number(searchParams.minRating)
      : undefined,
    maxRating: searchParams.maxRating
      ? Number(searchParams.maxRating)
      : undefined,
  };

  const pagination = {
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 10,
    sortBy: searchParams.sortBy as string,
    sortOrder: searchParams.sortOrder as "asc" | "desc",
  };

  const { data: users } = await userController.getUsers(filters, pagination);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Utilisateurs</h1>
      <UserList users={users} />
    </div>
  );
}
