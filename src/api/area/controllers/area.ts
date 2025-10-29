/**
 * area controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::area.area",
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
            message: "Area crated successfully!",
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
