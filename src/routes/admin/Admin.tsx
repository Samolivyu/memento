import { FC, ReactNode, useEffect, useState } from "react";
import { Authenticated } from "@refinedev/core";
import { CatchAllNavigate } from "@refinedev/react-router";
import { AdminUser, fetchAdminUsers, checkAdminRole } from '../admin/admin';

export interface AdminProps {
  children: ReactNode;
  roles?: string[]; // Roles allowed to access the admin panel
}

export const Admin: FC<AdminProps> = ({ children, roles = ["admin"] }) => 
  {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [adminUsers, setAdminUsers] = useState<AdminUser[] | null>(null);

  // Check User Role for Authorization
  useEffect(() => {
    const checkRole = async () => {
      try {
        const hasRole = await checkAdminRole("current-user-id"); // Replace with actual user ID
        setIsAuthorized(hasRole);
      } catch (error) {
        console.error("Failed to check role:", error);
        setIsAuthorized(false);
      }
    };
    checkRole();
  }, []);

  // Fetch Admin Data
  useEffect(() => {
    if (isAuthorized) {
      const fetchData = async () => {
        try {
          const users = await fetchAdminUsers();
          setAdminUsers(users);
        } catch (error) {
          console.error("Failed to fetch admin users:", error);
        }
      };
      fetchData();
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    return <CatchAllNavigate to="/login" />;
  }

  return (
    <Authenticated
      key="authenticated-admin"
      fallback={<CatchAllNavigate to="/login" />}
    >
      <div>
        <h1>Admin Kanban</h1>
        <pre>{JSON.stringify(adminUsers, null, 2)}</pre>
        {children}
      </div>
    </Authenticated>
  );
};

// Export Admin Resource
export const adminResource = {
  name: "admin",
  list: "./admin.ts", // Updated path to match your routing
  meta: {
    label: "Admin Panel",
    canDelete: false,
    roles: ["admin"],
  },
};