export default {
  routes: [
    {
      method: "GET",
      path: "/tables/list",
      handler: "table.customAction",
      config: {
        auth: false,
      },
    },
  ],
};
