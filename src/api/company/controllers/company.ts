/**
 * company controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::company.company",
  ({ strapi }) => {
    const service = strapi.service("api::company.company");
    const DB = strapi.db.query("api::company.company");

    return {
      async find(ctx) {
        try {
          const body = ctx.params;
          
          ctx.query = {
            ...ctx.query,
            populate: "*",
            filters: {
              active: { $eq: body?.active ?? true },
            },
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
            message: "Company created successfully!",
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

          const entity = await DB.update({
            where: { id: data.id },
            data,
          });

          ctx.body = {
            success: true,
            message: "Category edited successfully!",
            data: entity,
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

          if (!found) return ctx.notFound("Company not found!");

          await DB.update({
            where: { id: ID },
            data: { ...found, active: false },
          });

          ctx.body = {
            success: true,
            message: "Company deleted successfully!",
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
