/**
 * category controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::category.category",
  ({ strapi }) => {
    const service = strapi.service("api::category.category");
    const DB = strapi.db.query("api::category.category");

    return {
      async find(ctx) {
        try {
          const body = ctx.request.body.data;
          ctx.query = {
            ...ctx.query,
            populate: "*",
          };

          const props = Object.entries(body);

          if (props.length) {
            for await (const [key, value] of props) {
              const filters: any = ctx.query.filters;
              const opt = typeof value !== "string" ? "$eq" : "$containsi";

              ctx.query = {
                ...ctx.query,
                filters: {
                  ...filters,
                  [key]: { [opt]: value },
                },
              };
            }
          }

          const { data, meta } = await super.find(ctx);
          const { pagination } = meta;

          meta.date = Date.now();
          return { data, ...pagination, status: true, message: "OK" };
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

          const entity = await DB.update({
            where: { id: data.id },
            data,
          });
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
            where: { id: ID },
          });

          if (!found) return ctx.notFound("Category not found!");

          await DB.update({
            where: { id: ID },
            data: { ...found, active: false },
          });

          ctx.body = {
            success: true,
            message: "Category deleted successfully!",
          };
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
