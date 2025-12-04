import appLogic from "./appLogic";
import {render, setupEvents} from "./dom";

function init() {
    
    appLogic.initApp();
    render();
    setupEvents();
}

document.addEventListener('DOMContentLoaded', init);