import GSCEW from "./GSCEW_Lib/GSCEW.js"
import Input_Scroll from "./GSCEW_Lib/Inputs/GSCEW_Input_Scroll.js"
import Input_Mouse_Move from "./GSCEW_Lib/Inputs/GSCEW_Input_Mouse_Move.js"
import WidgetFollowCursor from "./GSCEW_Lib/behaviours/WidgetFollowCursor.js"
import WidgetMooveWithScroll from "./GSCEW_Lib/behaviours/WidgetMooveWithScroll.js"

const Gestion = new GSCEW()
Gestion.initInputs([
    new Input_Scroll(),
    new Input_Mouse_Move()
])
Gestion.initBehaviours([
    new WidgetFollowCursor(),
    new WidgetMooveWithScroll()
])
Gestion.initObjects([
    document.querySelector("[id=e1]")
])
