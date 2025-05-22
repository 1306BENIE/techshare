import { User } from "@/interfaces/user";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
      <div className="font-bold text-blue-700 mb-1">
        {user.firstName} {user.lastName}
      </div>
      <div className="text-gray-500 text-sm">{user.email}</div>
    </div>
  );
}
