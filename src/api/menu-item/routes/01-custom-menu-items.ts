import { config } from "process";

export default {
    routes: [
        {
            method: 'GET',
            path: "/menu-items/list",
            handler: "menu-item.find",
            config: {
                auth: false,
            }
        },
        {
            method: 'POST',
            path: "/menu-items/create",
            handler: "menu-item.create",
            config: {
                auth: false,
            }
        },
    ]
}