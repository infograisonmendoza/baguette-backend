export default {
  routes: [
    {
      method: "GET",
      path: "/categories/list",
      handler: "category.find",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/categories/create",
      handler: "category.create",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/categories/edit",
      handler: "category.edit",
      config: {
        auth: false,
      },
    },
    {
      method: "DELETE",
      path: "/categories/delete/:id",
      handler: "category.delete",
      config: {
        auth: false,
      },
    },
  ],
};
