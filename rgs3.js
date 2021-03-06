import { rgs3 } from "./module/config.js";
import RGS3ItemSheet from "./module/sheets/RGS3ItemSheet.js";
import RGS3DwellerSheet from "./module/sheets/RGS3DwellerSheet.js";

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/rgs3/templates/partials/power-card.hbs",
        "systems/rgs3/templates/partials/passive-card.hbs"
    ];

    return loadTemplates(templatePaths);
}

Hooks.once("init", function() {
    console.log("rgs3 | Initialising Fate of the Norns RGS System");

    CONFIG.rgs3 = rgs3;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("rgs3", RGS3ItemSheet, { makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("rgs3", RGS3DwellerSheet, { makeDefault: true });

    preloadHandlebarsTemplates();
});