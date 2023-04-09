import "./GSCEW.config.js"

document.querySelector("[id=e1]").addAnimations([
    {
        style: {
            translate: {
                Render: {
                    WidgetFollowCursor: [[-5, "vw"], [-5, "vh"]]
                },
                conditions: ["and", {
                    WidgetFollowCursor: {left: [0, window.innerWidth], top: [0, window.innerHeight]},
                    WidgetMooveWithScroll: [10, 20]
                }]
            },
        },
        class: {
            active: ["and",{
                WidgetFollowCursor: {left: [0, window.innerWidth*0.5], top: [0, window.innerHeight*0.5]}
            }]
        },
    },
])
