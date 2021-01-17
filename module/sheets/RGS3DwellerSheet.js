export default class RGS3DwellerSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: "systems/rgs3/templates/sheets/dweller-sheet.hbs",
            classes: ["rgs3", "sheet", "actor"],
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "actives"}],
            scrollY: [".actives"]
        });
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.rgs3;

        /* Active Power Data */
        let powerList = [];
        let availableList = [{}];

        // get bound active runes with associated powers
        for (const r of Object.entries(data.data.runes)) {
            if (r[1].boundActive) {
                powerList.push(r[1]);
            }
            else {
                availableList.push(r[1]);
            }
        }
        data.activeList = powerList;
        data.unboundActiveRunes = availableList;

        // get unbound active powers
        data.actives = data.items.filter(function (item) {return (item.type == "Active" && item.data.rune.symbol === "") } );
        data.activesToDisplay = data.items.filter(function (item) {return (item.type == "Active" && item.data.rune.symbol != "") } );

        data.socials = data.items.filter(function (item) { return item.type == "Social"});
        data.skills = data.items.filter(function (item) { return item.type == "Skill" });
        data.passives = data.items.filter(function (item) { return item.type == "Passive" });
        data.gear = data.items.filter(function (item) { return item.type == "Equipment" });

        return data;
    }

    activateListeners(html) {
        html.find(".power-bind").click(this._onItemPowerBind.bind(this));

        super.activateListeners(html);
    }

    _onItemPowerBind(event) {

        event.preventDefault();
        let element = event.currentTarget;

        console.log("Binding Power");
        
        let itemId = this.object.data.data.selectedPower;
        let runeName = this.object.data.data.selectedRune;
        

        let actor = game.actors.get(this.object.data._id);
        let data = actor.data;

        console.log(itemId);
        console.log(runeName);
        
        data.data.runes[runeName].activePower = itemId;
        data.data.runes[runeName].boundActive = true;

        const ap = `data.runes.${runeName}.activePower`;
        const ba = `data.runes.${runeName}.boundActive`;

        actor.update({[`${ap}`] : itemId });
        actor.update({[`${ba}`] : true });

        let itemUpdate = actor.getOwnedItem(itemId);
        const rs = "data.rune.symbol";
        itemUpdate.update({[`${rs}`]: runeName});

        this.render(true);

        console.log(actor);
    }
}