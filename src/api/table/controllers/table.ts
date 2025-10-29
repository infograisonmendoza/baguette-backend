/**
 * table controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::table.table",
  ({ strapi }) => {
    const service = strapi.service("api::menu-item.menu-item");
    const DB = strapi.db.query("api::menu-item.menu-item");

    return {
      async find(ctx) {
        const { data, meta } = await super.find(ctx);
        const { pagination } = meta;
        const { status, message } = ctx.response;

        meta.date = Date.now();
        return { data, pagination, status, message };
      },
      async create(ctx) {
        try {
          const { data } = ctx.request.body;
          if (!data) {
            return ctx.badRequest("Empty body");
          }

          const entity = await service.create({ data });
          const sanitized = await this.sanitizeOutput(entity, ctx);

          ctx.body = {
            success: true,
            message: "Table created successfully!",
            data: sanitized,
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
          if (!data || !data.id) {
            return ctx.badRequest("Id required!");
          }

          const entity = await service.create({ data });
          const sanitized = await this.sanitizeOutput(entity, ctx);

          ctx.body = {
            success: true,
            message: "Table edited successfully!",
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
            const ID = parseInt(id, 10);

            if (!id) return ctx.badRequest("id required!");

            const found = await DB.findOne({
                where: {id: ID},
            })

            if (!found) return ctx.notFound("Table doesn't exist")

            await DB.delete({
                where: { id: ID }
            })
        } catch (error) {
            ctx.body = {
                success: false,
                message: error.message,
            }
        }
      }
    };
  }
);
