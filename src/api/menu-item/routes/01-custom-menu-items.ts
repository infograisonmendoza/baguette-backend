export default {
  routes: [
    {
      method: "GET",
      path: "/menu-items/list",
      handler: "menu-item.find",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/menu-items/create",
      handler: "menu-item.create",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/menu-items/edit",
      handler: "menu-item.edit",
      config: {
        auth: false,
      },
    },
    {
      method: "DELETE",
      path: "/menu-items/delete/:id",
      handler: "menu-item.delete",
      config: {
        auth: false,
      },
    },
  ],
};
