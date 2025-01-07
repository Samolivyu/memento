import { Authenticated } from "@refinedev/core";
import { FC, ReactNode } from "react";
import { CatchAllNavigate } from "@refinedev/react-router";

interface AdminProps {
  children: ReactNode;
  roles?: string[];
}

export const Admin: FC<AdminProps> = ({ children, roles = ["admin"] }) => {
  return (
    <Authenticated
      key="authenticated-admin"
      fallback={<CatchAllNavigate to="/login" />}
      appendCurrentPathToNavigate={true}
    >
      <RequireRole roles={roles}>{children}</RequireRole>
    </Authenticated>
  );
};

const RequireRole: FC<AdminProps> = ({ children, roles }) => {
  // You'll need to implement this check based on your authProvider
  const userRole = "admin"; // Replace with actual role check from your auth system
  
  if (!roles.includes(userRole)) {
    return <CatchAllNavigate to="/login" />;
  }

  return <>{children}</>;
};