export default class RGS3ItemSheet extends ItemSheet {

    get template() {
        let typeName = this.item.data.type.toLowerCase();
        return `systems/rgs3/templates/sheets/${typeName}-sheet.hbs`;
    }

    getData() {
        const data = super.getData();

        data.config = CONFIG.rgs3;

        return data;
    }

    activateListeners(html) {
        html.find(".effect-create").click(this._onItemEffectCreate.bind(this));
        html.find(".effect-delete").click(this._onItemEffectDelete.bind(this));

        super.activateListeners(html);
    }

    _onItemEffectCreate(event) {
        event.preventDefault();
        let element = event.currentTarget;

        console.log("Adding Effect");

        // Get list of effects currently in item data
        let effcts = this.object.data.data.powerEffects;

        // Generate new key value for effect - effects must be added in order
        let newKey = Object.keys(effcts).length +1;

        // Empty effect template
        let newEff = {
            effect: "Empty",
            value: 0,
            type: "Flavor"
        }

        // Add empty effect placement and re-render sheet
        effcts[newKey] = newEff;
        this.render();
    }

    _onItemEffectDelete(event) {
        event.preventDefault();
        let element = event.currentTarget;

        console.log("Deleting Effect");

        // Get list of effects currently in item data
        let effcts = this.object.data.data.powerEffects;

        // Get index of effect to be deleted
        let effectId = element.closest(".power-effect").dataset.itemId;

        // Remove effect and re-render sheet
        delete effcts[effectId];
        this.render();
    }
}