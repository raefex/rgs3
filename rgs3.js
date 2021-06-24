import { rgs3 } from "./module/config.js";
import RGS3Actor from "./module/RGS3Actor.js";
import RGS3Item from "./module/RGS3Item.js";
import RGS3ItemSheet from "./module/sheets/RGS3ItemSheet.js";
import RGS3ActorSheet from "./module/sheets/RGS3ActorSheet.js";

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/rgs3/templates/partials/character-stat-block.hbs",
        "systems/rgs3/templates/partials/equipment-stat-block.hbs"
    ];

    return loadTemplates(templatePaths);
}

Hooks.once("init", function () {
    console.log("rgs3 | Initializing Runic Game System v3");

    CONFIG.rgs3 = rgs3;
    CONFIG.Actor.documentClass = RGS3Actor;
    CONFIG.Item.documentClass = RGS3Item;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("rgs3", RGS3ItemSheet, { makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("rgs3", RGS3ActorSheet, {
        types: ["dweller"], 
        makeDefault: true 
    });

    preloadHandlebarsTemplates();
});