export default class RGS3ItemSheet extends ItemSheet {

    get template() {
        let typeName = this.item.data.type.toLowerCase();
        return `systems/rgs3/templates/sheets/${typeName}-sheet.html`;
    }

    getData() {
        const data = super.getData();

        data.config = CONFIG.rgs3;

        return data;
    }
}