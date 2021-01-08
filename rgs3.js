import { rgs3 } from "./module/config.js";
import RGS3ItemSheet from "./module/sheets/RGS3ItemSheet.js";

Hooks.once("init", function() {
    console.log("rgs3 | Initialising Fate of the Norns RGS System");

    CONFIG.rgs3 = rgs3;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("rgs3", RGS3ItemSheet, { makeDefault: true });
});