export default {
  routes: [
    {
      method: "GET",
      path: "/companies/list",
      handler: "company.find",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/companies/create",
      handler: "company.create",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/companies/edit",
      handler: "company.edit",
      config: {
        auth: false,
      },
    },
    {
      method: "DELETE",
      path: "/companies/delete/:id",
      handler: "company.delete",
      config: {
        auth: false,
      },
    },
  ],
};