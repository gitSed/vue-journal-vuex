import { RouteComponent, RouteRecordRaw } from "vue-router";

const daybookRouter: RouteRecordRaw = {
  path: "/daybook",
  name: "daybook",
  component: (): Promise<RouteComponent> =>
    import(
      /* webpackChunkName: "daybook" */ "@/modules/daybook/layouts/DaybookLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "no-entry",
      component: (): Promise<RouteComponent> =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ "@/modules/daybook/views/NoEntrySelected.vue"
        ),
    },
    {
      path: ":id",
      name: "entry",
      component: (): Promise<RouteComponent> =>
        import(
          /* webpackChunkName: "daybook-entry" */ "@/modules/daybook/views/EntryView.vue"
        ),
    },
  ],
};

export default daybookRouter;
