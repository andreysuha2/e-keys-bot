import controllers from "core-controllers";

export default [
    {
        url: "/",
        method: "get",
        controller: controllers.Welcome,
        handler: "welcome"
    },
    {
        url: "/sync",
        children: [
            {
                url: "/stored",
                method: "post",
                controller: controllers.Sync,
                handler: "syncStored"
            },
            {
                url: "",
                method: "post",
                controller: controllers.Sync,
                handler: "onSync"
            },
            {
                url: "",
                method: "get",
                controller: controllers.Sync,
                handler: "syncLog"
            }
        ]
    },
    {
        url: "/subscribers",
        children: [
            {
                url: "",
                method: "get",
                controller: controllers.Subscribers,
                handler: "get"
            },
            {
                url: "",
                method: "post",
                controller: controllers.Subscribers,
                handler: "set"
            }
        ]
    }
];