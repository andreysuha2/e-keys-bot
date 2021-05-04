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
        method: "post",
        controller: controllers.Sync,
        handler: "onSync"
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