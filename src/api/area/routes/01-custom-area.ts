export default {
  routes: [
    {
      method: "GET",
      path: "/areas/list",
      handler: "area.find",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/areas/create",
      handler: "area.create",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/areas/edit",
      handler: "area.edit",
      config: {
        auth: false,
      },
    },
    {
      method: "DELETE",
      path: "/areas/delete/:id",
      handler: "area.delete",
      config: {
        auth: false,
      },
    },
  ],
};
