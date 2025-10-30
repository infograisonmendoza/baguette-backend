/**
 * warehouse controller
 */

import { Data, factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::warehouse.warehouse",
  ({ strapi }) => {
    const service = strapi.service("api::warehouse.warehouse");
    const DB = strapi.db.query("api::warehouse.warehouse");
    return {
      async find(ctx) {
        try {
          ctx.query = {
            ...ctx.query,
            populate: "*",
          };
          const { data, meta } = await super.find(ctx);
          const { pagination } = meta;

          meta.date = Date.now();
          ctx.body = {
            success: true,
            message: "",
            data,
            ...pagination,
          };
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

          if (!data || !data.name) {
            return ctx.badRequest("Empty body");
          }

          const entity = await service.create({ data })
          const sanitized = await this.sanitizeOutput(entity, ctx);

          ctx.body = {
            success: true,
            message: "Warehouse created successfully",
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
                return ctx.badRequest("ID required!");
            }

            const entity = service.update(data.id, { data });
            // const sanitized = await this.sanitizeOutput(entity, ctx);

            ctx.body = {
                success: true,
                message: "Edited successfully!",
                data: entity,
            }
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
