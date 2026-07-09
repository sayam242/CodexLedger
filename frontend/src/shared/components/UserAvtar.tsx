import {
  Avatar,
  AvatarFallback
} from "@/components/ui/avatar";

import { useAuth } from "@/auth/hooks/useAuth";

function getInitials(displayName: string | null | undefined): string {
  if (!displayName) return "?";

  const parts = displayName.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (
    parts[0].charAt(0) +
    parts[parts.length - 1].charAt(0)
  ).toUpperCase();
}

export default function UserAvatar() {
  const { user } = useAuth();

  const initials = getInitials(user?.displayName);

  return (

    <Avatar className="h-9 w-9">

      <AvatarFallback className="bg-black text-white text-sm font-medium">

        {initials}

      </AvatarFallback>

    </Avatar>

  );

}
