/**
 * menu-item controller
 */

import { factories } from "@strapi/strapi";
const PropsToShow = [
  "id",
  "name",
  "description",
  "price",
  "photos",
  "quantity",
  "total_price",
  "profile_image",
  "observation",
  "options",
  "category",
  "active",
];

export default factories.createCoreController(
  "api::menu-item.menu-item",
  ({ strapi }) => {
    const service = strapi.service("api::menu-item.menu-item");
    const DB = strapi.db.query("api::menu-item.menu-item");

    return {
      async find(ctx) {
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

        ctx.body = {
          success: true,
          message: "Category listed successfully!",
          data,
          ...pagination,
        };
      },
      async create(ctx) {
        try {
          const { data } = ctx.request.body;

          if (!data.name || !data.price) {
            return ctx.badRequest("Name and price are required! >:E");
          }

          const entity = await service.create({ data });
          const sanitized = await this.sanitizeOutput(entity, ctx);

          ctx.body = {
            success: true,
            message: "Category created successfully!",
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
            return ctx.badRequest("No data provides for update");
          }

          const entity = await DB.update({
            where: { id: data.id },
            data,
          });
          const sanitized = await this.sanitizeOutput(entity, ctx);

          ctx.body = {
            success: true,
            message: "Category has been updated successfully!",
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

          if (!found) return ctx.notFound("Dish not found!");

          await DB.update({
            where: { id: ID },
            data: { ...found, active: false },
          });

          ctx.body = {
            success: true,
            message: "Dish deleted successfully!",
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
