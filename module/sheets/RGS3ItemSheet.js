export default class RGS3ItemSheet extends ItemSheet {

    get template() {
        return `systems/rgs3/templates/sheets/${this.item.data.type}-sheet.html`;
    }

    getData() {
        const data = super.getData();

        data.config = CONFIG.rgs3;

        return data;
    }
}