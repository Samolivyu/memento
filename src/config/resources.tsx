import type { IResourceItem } from "@refinedev/core";

import {
  ProjectOutlined,
} from "@ant-design/icons";

export const resources: IResourceItem[] = 
[
  
  {
    name: "tasks",
    list: "/",
    create: "/tasks/new",
    edit: "/tasks/edit/:id",
    meta: 
    {
      label: "Tasks",
      icon: <ProjectOutlined />,
    },
    
    {
      name: "admin",
      list: "/admin",
      meta: 
      {
        label: "Admin Panel",
        canDelete: false,
        roles: ["admin"], // This resource will only be visible to admins
      },
    },
  },
];
