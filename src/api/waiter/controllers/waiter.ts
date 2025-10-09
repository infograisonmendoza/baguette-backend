/**
 * waiter controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::waiter.waiter",
  ({ strapi }) => {
    const service = strapi.service("api::waiter.waiter");
    const DB = strapi.db.query("api::waiter.waiter");
    return {
      async find(ctx) {
        ctx.query = {
          ...ctx.query,
          populate: "*",
        };
        const { data, meta } = await super.find(ctx);
        const formatted = data.map((el) => ({
          id: el.id,
          firstName: el.firstName,
          lastName: el.lastName,
          alias: el.alias,
          active: el.active,
          waiterAlias: el.waiterAlias,
          tables: el.tables.map((el) => ({
            id: el.id,
            table_name: el.table_name,
            active: el.active,
            occupied: el.occupied,
          })),
        }));
        return { data: formatted, meta };
      },

      async create(ctx) {
        try {
          const { data } = ctx.request.body;

          if (!data.firstName || !data.lastName) {
            return ctx.badRequest("First and last name are required! >:( ");
          }

          const entity = await service.create({ data });
          const sanitized = await this.sanitizeOutput(entity, ctx);

          ctx.body = {
            success: true,
            message: "Waiter created successfully :D",
            data: sanitized,
          };
        } catch (error) {
          ctx.body = {
            success: false,
            message: error.message,
          };
        }
      },

      async delete(ctx) {
        try {
          const { id } = ctx.params;
          if (!id) return ctx.badRequest("ID required");

          const existing = await DB.findOne({
            where: { id: parseInt(id, 10) },
          });

          if (!existing) return ctx.notFound("Waiter doesn't exist");

          await DB.delete({
            where: { id: parseInt(id, 10) },
          });

          const { firstName, lastName, alias } = existing;
          ctx.body = {
            success: true,
            message: `${firstName} ${lastName} alias ${alias}, has been promoted to customer :D`,
          };
        } catch (err) {
          ctx.body = {
            success: false,
            message: err.message,
          };
        }
      },
    };
  }
);
