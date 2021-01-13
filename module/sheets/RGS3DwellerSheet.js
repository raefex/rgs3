export default class RGS3DwellerSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: "systems/rgs3/templates/sheets/dweller-sheet.hbs",
            classes: ["rgs3", "sheet", "dweller"],
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "charInfo"}]
        });
    }

    getData() {
        const data = super.getData();

        return data;
    }
}