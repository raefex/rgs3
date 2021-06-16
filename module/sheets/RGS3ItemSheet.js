export default class RGS3ItemSheet extends ItemSheet {

    get template() {
        return `systems/rgs3/templates/sheets/${this.item.data.type}-sheet.hbs`;
    }

    
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["rgs3", "sheet", "item"],
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: ".itemStats"}]
        });
    }
    

    getData() {
        const data = super.getData();

        data.config = CONFIG.rgs3;

        console.log("ITEM data:");
        console.log(data);

        return data;
    }
}