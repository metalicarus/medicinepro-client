import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import FisioVr from "@/pages/FisioVr";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "fisio-vr",
        name: "FisioVr",
        component: FisioVr
      }
    ]
  }
];

export default routes;
