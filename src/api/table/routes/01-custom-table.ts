export default {
  routes: [
    {
      method: "GET",
      path: "/tables/list",
      handler: "table.find",
      config: {
        auth: false,
      },
    },
  ],
};
