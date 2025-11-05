export default {
  routes: [
    {
      method: "POST",
      path: "/waiters/list",
      handler: "waiter.find",
      config: {
        auth: false, // o true si quieres requerir JWT
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/waiters/create",
      handler: "waiter.create",
      config: {
        auth: false, // o true si quieres requerir JWT
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/waiters/edit",
      handler: "waiter.edit",
      config: {
        auth: false, // o true si quieres requerir JWT
        policies: [],
      },
    },
    {
      method: "DELETE",
      path: "/waiters/:id",
      handler: "waiter.delete",
      config: {
        auth: false, // o true si quieres requerir JWT
        policies: [],
      },
    },
  ],
};
