export default class RGS3ItemSheet extends ItemSheet {
    get template() {
        return `systems/rgs3/templates/sheets/${this.item.data.type}-sheet.hbs`;
    }

    getData() {
        const data = super.getData();

        data.config = CONFIG.rgs3;

        console.log("ITEM data:");
        console.log(data);

        return data;
    }
}