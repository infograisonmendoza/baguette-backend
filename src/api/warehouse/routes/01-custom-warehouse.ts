export default {
  routes: [
    {
      method: "GET",
      path: "/warehouses/list",
      handler: "warehouse.find",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/warehouses/create",
      handler: "warehouse.create",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/warehouses/edit",
      handler: "warehouse.edit",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/warehouses/delete",
      handler: "warehouse.delete",
      config: {
        auth: false,
      },
    },
  ],
};
