import { Position, Toaster, Intent } from "@blueprintjs/core";
 
/** Singleton toaster instance. Create separate instances for different options. */
const ToasterBottom = Toaster.create({
    className: "recipe-toaster",
    position: Position.BOTTOM,
    timeout: 1000
});

export default ToasterBottom;