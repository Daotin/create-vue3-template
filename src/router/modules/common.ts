import type { RouteRecordRaw } from "vue-router";

const route: RouteRecordRaw[] = [
  {
    name: "NotFound",
    path: "/error/not-found",
    component: () => import("@/views/common/NotFound.vue"),
    meta: {
      title: "页面丢失",
    },
  },
  {
    name: "Forbidden",
    path: "/error/forbidden",
    component: () => import("@/views/common/Forbidden.vue"),
    meta: {
      title: "无权限",
    },
  },
];

export default route;
