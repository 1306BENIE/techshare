import { Suspense } from "react";
import { UserList } from "@/components/users/UserList";
import { UserFilters, User } from "@/interfaces/user/types";
import { PaginationParams } from "@/interfaces/common/pagination.types";
import { UserApiService } from "@/services/user.api";

export const dynamic = "force-dynamic";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const userApi = new UserApiService();
  const filters: UserFilters = {};
  const pagination: PaginationParams = {
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 10,
  };

  if (searchParams.role) filters.role = searchParams.role as "USER" | "ADMIN";
  if (searchParams.isVerified !== undefined)
    filters.isVerified = searchParams.isVerified === "true";
  if (searchParams.search) filters.search = searchParams.search as string;

  const { data: users } = await userApi.getUsers(filters, pagination);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Utilisateurs</h1>
      <Suspense fallback={<div>Chargement...</div>}>
        <UserList users={users || []} />
      </Suspense>
    </div>
  );
}
