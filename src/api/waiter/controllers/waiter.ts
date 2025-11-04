/**
 * waiter controller
 */

import { factories } from "@strapi/strapi";

const propsToShow = [
  "id",
  "firstName",
  "lastName",
  "alias",
  "active",
  "waiterAlias",
  "table_id",
]

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
        const { pagination } = meta;
        const formatted = data.map((el) => {
          let obj = {};
          for (const prop of propsToShow) {
            obj[prop] = el[prop];
          }
          return obj;
        });

        console.log(formatted[0]);

        return { ...pagination, data: formatted };
      },
      async create(ctx) {
        try {
          const { data } = ctx.request.body;

          if (!data.firstName || !data.lastName) {
            return ctx.badRequest("First and last name are required! >:( ");
          }

          const entity = await service.create({ data });
          console.log(data.table_id, entity);
          
          ctx.body = {
            success: true,
            message: "Waiter created successfully :D",
            data: { ...entity, table_id: data.table_id },
          };
        } catch (error) {
          ctx.body = {
            success: false,
            message: error.message,
          };
        }
      },
      async edit(ctx) {
        try {
          const { data } = ctx.request.body;

          if (!data.firstName || !data.lastName) {
            return ctx.badRequest("First and last name are required! >:( ");
          }

          const entity = await DB.update({
            where: { id: data.id },
            data,
          });
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
