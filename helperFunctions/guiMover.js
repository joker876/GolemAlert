export function initiateGuiMover() {
    let isSelected = false;
    function clickFunc(mouseX, mouseY) {
        if (
            mouseX > global.golemalert.display.getRenderX() - 2 - Renderer.screen.getWidth()/2 &&
            mouseX < global.golemalert.display.getRenderX() + global.golemalert.display.getWidth()/2 + 2 &&
            mouseY > global.golemalert.display.getRenderY() - 1 && 
            mouseY < global.golemalert.display.getRenderY() + (global.golemalert.display.getHeight() * 9 + global.golemalert.display.getHeight() * 2) * global.golemalert.scale
        ) {
            isSelected = true;
            global.golemalert.display.setBackgroundColor(Renderer.color(255, 255, 255, 50));
        }
    }
    global.golemalert.display.setRenderLoc(global.golemalert.data.x, global.golemalert.data.y);

    function dragFunc(dx, dy) {
        if (isSelected) {
            global.golemalert.data.x += dx;
            global.golemalert.data.y += dy;
            global.golemalert.display.setRenderLoc(global.golemalert.data.x, global.golemalert.data.y);
        }
    }

    function releaseFunc() {
        isSelected = false;
        global.golemalert.display.setBackgroundColor(Renderer.color(0, 0, 0, 0));
    }

    register("dragged", dragFunc);
    global.golemalert.gui.registerClicked(clickFunc);
    global.golemalert.gui.registerMouseReleased(releaseFunc);
}
export function guiMover() {
    if (global.golemalert.gui.isOpen()) {
        Renderer.drawRect(
            Renderer.color(0, 0, 0, 70),
            0,
            0,
            Renderer.screen.getWidth(),
            Renderer.screen.getHeight()
        );
    }
}