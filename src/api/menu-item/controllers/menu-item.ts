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
];

export default factories.createCoreController(
  "api::menu-item.menu-item",
  ({ strapi }) => {
    const service = strapi.service("api::menu-item.menu-item");
    const DB = strapi.db.query("api::menu-item.menu-item");

    return {
      async find(ctx) {
        ctx.query = {
          ...ctx.query,
          populate: "*",
        };

        const { data, meta } = await super.find(ctx);
        const { pagination } = meta;
        const formatted = data.map((el) => {
          let body = {};
          for (const prop of PropsToShow) {
            body[prop] = el[prop];
          }
          return body;
        });

        ctx.body = {
          success: true,
          message: "Category listed successfully!",
          data: formatted,
          pagination,
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

          const entity = await service.update(data.id, { data });
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

          if (!id) return ctx.notFound("Waiter does'nt exist");

          const found = await DB.findOne({
            where: { id: ID },
          });

          if (!found) return ctx.notFound("Waiter doesn't exist");

          await DB.delete({
            where: { id: ID },
          });

          ctx.body = {
            success: true,
            message: `${found.name} has been deleted correctly`,
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
