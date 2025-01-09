import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { RefineThemes, useNotificationProvider } from "@refinedev/antd";
import { Authenticated, ErrorComponent, LoginPage, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import routerProvider, {  CatchAllNavigate, DocumentTitleHandler, NavigateToResource, UnsavedChangesNotifier, } from "@refinedev/react-router";
import { App as AntdApp, ConfigProvider } from "antd";

import { Layout } from "@/components";
import { Admin, AdminProps } from "@/routes/admin/Admin"; 
import { resources } from "@/config/resources";
import { authProvider, dataProvider, liveProvider } from "@/providers";
// export { LoginPage } from "./routes/login/index";
export { TasksCreatePage } from "./routes/tasks/create/index";
export { TasksEditPage } from "./routes/tasks/edit/index";
export { TasksListPage } from "./routes/tasks/list/index";

import "@refinedev/antd/dist/reset.css";
import { TasksCreatePage, TasksEditPage, TasksListPage } from "./routes/tasks/index";
import { AdminKanban } from "./routes/admin/AdminKanban";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              authProvider={authProvider}
              resources={resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                liveMode: "auto",
                useNewQueryKeys: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route index element={<TasksListPage />} />

                  <Route path="/tasks">
                    <Route index element={<TasksListPage />} />
                    <Route path="new" element={<TasksCreatePage />} />
                    <Route path="edit/:id" element={<TasksEditPage />} />
                  </Route>

                  <Route path="/admin"
                    element={
                      <Admin roles={["admin"]}>
                        <Outlet />
                      </Admin>
                    }
                  >
                    <Route index element={<Admin children={undefined} />} />
                    <Route path="kanban" element={<AdminKanban />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>

                <Route
                  element={
                    <Authenticated key="authenticated-auth" fallback={<Outlet />}>
                      <NavigateToResource resource="tasks" />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<LoginPage />} />
                </Route>
              </Routes>
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;