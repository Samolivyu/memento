import { gql } from "graphql-request";
import { client } from "../../providers/index";

// Types
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const adminResource = {
  name: "admin",
  list: "./Admin.tsx",
  create: "/admin/new",
  edit: "/admin/edit/:id",
  meta: {
    label: "Admin",
  },
};


interface AdminUsersResponse {
  adminUsers: AdminUser[];
}

interface UpdateSettingsResponse {
  updateSettings: {
    success: boolean;
    message: string;
  };
}

interface CheckRoleResponse {
  user: {
    id: string;
    role: string;
  };
}

// GraphQL Queries & Mutations
const ADMIN_USERS_QUERY = gql`
  query AdminUsers {
    adminUsers {
      id
      name
      email
      role
    }
  }
`;

const UPDATE_SETTINGS_MUTATION = gql`
  mutation UpdateSettings($input: SettingsInput!) {
    updateSettings(input: $input) {
      success
      message
    }
  }
`;

const CHECK_ROLE_QUERY = gql`
  query CheckRole($id: ID!) {
    user(id: $id) {
      id
      role
    }
  }
`;

// API Functions
export const fetchAdminUsers = async (): Promise<AdminUser[]> => {
  try {
    const data = await client.request<AdminUsersResponse>(ADMIN_USERS_QUERY);
    return data.adminUsers;
  } catch (error) {
    console.error("Error fetching admin users:", error);
    throw error;
  }
};

export const updateAdminSettings = async (
  settings: { [key: string]: any }
): Promise<{ success: boolean; message: string }> => {
  try {
    const variables = { input: settings };
    const data = await client.request<UpdateSettingsResponse>(
      UPDATE_SETTINGS_MUTATION,
      variables
    );
    return data.updateSettings;
  } catch (error) {
    console.error("Error updating admin settings:", error);
    throw error;
  }
};

export const checkAdminRole = async (userId: string): Promise<boolean> => {
  try {
    const variables = { id: userId };
    const data = await client.request<CheckRoleResponse>(
      CHECK_ROLE_QUERY,
      variables
    );
    return data.user.role === "admin";
  } catch (error) {
    console.error("Unauthorised Admin:", error);
    throw error;
  }
};