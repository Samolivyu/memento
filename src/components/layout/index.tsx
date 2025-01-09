import React from "react";
import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";
import { Header } from "./header";
import { Link } from "react-router"; 

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data: user } = useGetIdentity<{ roles: string[] }>();
  const isAdmin = user?.roles?.includes("admin");

  return (
    <ThemedLayoutV2
      Header={Header}
      Title={(titleProps) => <ThemedTitleV2 {...titleProps} text="Refine" />}
    >
      <div>
        <nav>
          {isAdmin && (
            <>
              <Link to="/admin">Admin Dashboard</Link>
            </>
          )}
        </nav>
        {children}
      </div>
    </ThemedLayoutV2>
  );
};