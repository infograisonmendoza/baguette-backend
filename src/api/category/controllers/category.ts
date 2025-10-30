/**
 * category controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::category.category",
  ({ strapi }) => {
    const service = strapi.service("api::area.area");
    const DB = strapi.db.query("api::area.area");

    return {
      async find(ctx) {
        try {
          ctx.query = {
            ...ctx.query,
            populate: "*",
          };
          const { data, meta } = await super.find(ctx);
          const { pagination } = meta;
          const { status, message } = ctx.response;

          meta.date = Date.now();
          return { data, pagination, status, message };
        } catch (error) {
          ctx.body = {
            success: false,
            message: error.message,
          };
        }
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
            message: "Category crated successfully!",
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

          const entity = await service.update(data.id, { data });
          const sanitized = await this.sanitizeOutput(entity, ctx);

          ctx.body = {
            success: true,
            message: "Category edited successfully!",
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
                where: { id: ID }
            });

            if(!found) return ctx.notFound("");

            await DB.delete({
                where: { id: ID }
            })

            ctx.body = {
                success: true,
                message: "Category deleted successfully!",
            }
        } catch (error) {
          ctx.body = {
            success: false,
            message: error.message,
          };
        }
      },
    };
  }
);
