/**
 * table controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::table.table', ({ strapi }) => ({
    async customAction (ctx) {
        try {
            const { status, message } = ctx.response;
            const { data, meta } = await super.find(ctx)
            ctx.body = { 
                response: JSON.stringify(ctx.response),
                state: JSON.stringify(ctx.state),
                status: JSON.stringify(ctx.status),
                success: status,
                message,
                data,
                total: meta.pagination.total || 0,
            }
        } catch (err) {
            ctx.body = err
        }
    },
    async find(ctx) {
        const { data, meta } = await super.find(ctx);
        const { status, message } = ctx.response;
        meta.date = Date.now();
        return { data, meta, status, message }
    }
}));
