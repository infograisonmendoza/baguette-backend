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
    {
      method: "POST",
      path: "/tables/create",
      handler: "table.create",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/tables/edit",
      handler: "table.edit",
      config: {
        auth: false,
      },
    },
    {
      method: "DELETE",
      path: "/tables/delete/:id",
      handler: "table.delete",
      config: {
        auth: false,
      },
    },
  ],
};
