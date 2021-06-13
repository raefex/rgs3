import BindRune from "../apps/bind-rune.js";

export default class RGS3ActorSheet extends ActorSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: "systems/rgs3/templates/sheets/dweller-sheet.hbs",
            classes: ["rgs3", "sheet", "dweller"],
            height: 890,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "playMat"}],
            scrollY: [".runeMap", ".playMat", ".equipment"],
            dragDrop: [ {dragSelector: ".zone-list .zone", dropSelector: ".zone, .bag"} ]
        });
    }

    getData() {
        //console.log("super.getData", super.getData());

        const data = super.getData();
        data.config = CONFIG.rgs3;
        const actorData = data.actor.data;
        data.actor = actorData;
        data.data = actorData.data;

        /* ---------------------------------------------------- */
        /* Zone assignment to sheet data                        */
        /* ---------------------------------------------------- */

        // IN-BAG SIZE CALC
        let inBagRunes = [];
        for (const r of Object.entries(actorData.data.runes)) {
            if (r[1].zone == "inBag" && r[1].bound) {
                inBagRunes.push(r[0]);
            }
        }
        data.inBagSize = inBagRunes.length;

        // IN-PLAY ZONE
        let inPlayRunes = [];
        for (const r of Object.entries(actorData.data.runes)) {
            if (r[1].zone == "inPlay" && r[1].bound) {
                inPlayRunes.push(r[0]);
            }
        }
        data.inPlayZone = inPlayRunes;

        // CONTINGENCY ZONE
        let contingencyRunes = [];
        for (const r of Object.entries(actorData.data.runes)) {
            if (r[1].zone == "contingency" && r[1].bound) {
                contingencyRunes.push(r[0]);
            }
        }
        data.contingencyZone = contingencyRunes;

        // IN-HAND ZONE
        let inHandRunes = [];
        for (const r of Object.entries(actorData.data.runes)) {
            if (r[1].zone == "inHand" && r[1].bound) {
                inHandRunes.push(r[0]);
            }
        }
        data.inHandZone = inHandRunes;
        
        // STUN ZONE
        let stunRunes = [];
        for (const r of Object.entries(actorData.data.runes)) {
            if (r[1].zone == "stun" && r[1].bound) {
                stunRunes.push(r[0]);
            }
        }
        data.stunZone = stunRunes;

        // WOUND ZONE
        let woundRunes = [];
        for (const r of Object.entries(actorData.data.runes)) {
            if (r[1].zone == "wounds" && r[1].bound) {
                woundRunes.push(r[0]);
            }
        }
        data.woundZone = woundRunes;

        // DEATH ZONE
        let deathRunes = [];
        for (const r of Object.entries(actorData.data.runes)) {
            if (r[1].zone == "death" && r[1].bound) {
                deathRunes.push(r[0]);
            }
        }
        data.deathZone = deathRunes;

        // DRAIN ZONE
        let drainRunes = [];
        for (const r of Object.entries(actorData.data.runes)) {
            if (r[1].zone == "drain" && r[1].bound) {
                drainRunes.push(r[0]);
            }
        }
        data.drainZone = drainRunes;

        // Calculate Health Value
        actorData.data.health.value = parseInt(actorData.data.health.max) - 
            (stunRunes.length + 
                2 * woundRunes.length +
                3 * deathRunes.length +
                3 * drainRunes.length);
        
        //console.log("ACTOR SHEET data:");
        //console.log(data);

        return data;
    }

    activateListeners(html) {

        if ( this.isEditable ) {
            html.find('.level-purchase').click(this._onLevelPurchase.bind(this));
            html.find('.level-remove').click(this._onLevelRemove.bind(this));
            html.find('.destiny-purchase').click(this._onDestinyPurchase.bind(this));
            html.find('.destiny-remove').click(this._onDestinyRemove.bind(this));
            html.find('.bind-rune').click(this._onBindRune.bind(this));
            html.find('.wyrd').click(this._onWyrdRunes.bind(this));
            html.find('.dmg-rune').click(this._onPullRuneToStun.bind(this));
            html.find('.cleanup').click(this._onCleanupRunes.bind(this));
            html.find('.heal-all').click(this._onHealAll.bind(this));
        }

        super.activateListeners(html);
    }

    _onLevelPurchase(event) {
        event.preventDefault();
        console.log("Add Total Level");

        let actor = game.actors.get(this.object.data._id);
        let data = actor.data;
        let newLevel = data.data.level.value + 1;

        actor.update( {"data.level.value" : newLevel} );
        console.log("Total Level Increased");
    }

    _onLevelRemove(event) {
        event.preventDefault();
        console.log("Remove Total Level");

        let actor = game.actors.get(this.object.data._id);
        let data = actor.data;
        
        if (data.data.level.value > 3) {
            let newLevel = data.data.level.value - 1;
            actor.update( {"data.level.value" : newLevel} );

            console.log("Total Level Decreased");
        }
        else {
            ui.notifications.error("Total Level cannot drop below three.");
        }
    }

    _onDestinyPurchase(event) {
        event.preventDefault();
        console.log("Purchase Destiny");

        let actor = game.actors.get(this.object.data._id);
        let data = actor.data;
        
        if (data.data.level.value > data.data.level.spent) {
            let newDestiny = data.data.destiny + 0.5;
            actor.update( {"data.destiny" : newDestiny} );

            console.log("Destiny Increased");
        }
        else {
            ui.notifications.error("Not enough character levels to support purchasing Destiny");
        }
    }

    _onDestinyRemove(event) {
        event.preventDefault();
        console.log("Remove Destiny Level");

        let actor = game.actors.get(this.object.data._id);
        let data = actor.data;

        if (data.data.destiny > 0) {
            let newDestiny = data.data.destiny - 0.5;
            actor.update( {"data.destiny" : newDestiny} );

            console.log("Destiny Decreased");
        }
        else {
            ui.notifications.error("Destiny cannot drop below zero");
        }
    }

    _onBindRune(event) {
        event.preventDefault();
        let app = new BindRune(this.object);
        app.render(true);
    }

    _onWyrdRunes(event) {
        event.preventDefault();
        console.log("Wyrd Runes");

        //get actor reference
        let actor = game.actors.get(this.object.data._id);
        let data = actor.data;

        let destiny = this.object.data.data.destiny;
        let essenceBag = this.object.data.data.essenceBag;
        let runes = data.data.runes;
        
        let inBag = [];
        for (const eb of essenceBag) {
            if (runes[eb].zone == "inBag") {
                inBag.push(eb);
            }
        }

        if (inBag.length > 0) {
            for (var i=0; i < destiny; i++) {
                if (inBag.length > 0) {
                    var index = (Math.floor(Math.random() * inBag.length));
                    var r = inBag[index];
                    runes[r].zone = "inHand";
                    inBag.splice(index,1);
                }
            }
            actor.update({"data.runes": runes});
        }
        else {
            ui.notifications.error("No Runes to Wyrd from Essence Bag");
        }
        console.log("Runes Pulled");
    }

    _onPullRuneToStun(event) {
        event.preventDefault();
        console.log("Pull Rune to Stun");

        //get actor reference
        let actor = game.actors.get(this.object.data._id);
        let data = actor.data;
        let essenceBag = this.object.data.data.essenceBag;
        let runes = data.data.runes;

        let inBag = [];
        for (const eb of essenceBag) {
            if (runes[eb].zone == "inBag") {
                inBag.push(eb);
            }
        }

        if (inBag.length > 0) {
            var index = (Math.floor(Math.random() * inBag.length));
                var r = inBag[index];
                runes[r].zone = "stun";
                inBag.splice(index,1);

                actor.update({"data.runes": runes});
        }
        else {
            ui.notifications.error("No Runes to Pull from Essence Bag");
        }
    }

    _onCleanupRunes(event) {
        event.preventDefault();
        console.log("Cleanup Runes");

        //get actor reference
        let actor = game.actors.get(this.object.data._id);
        let data = actor.data;

        let essenceBag = this.object.data.data.essenceBag;
        let runes = data.data.runes;

        for (const eb of essenceBag) {
            let zone = runes[eb].zone;

            if (zone == "inHand" || zone == "contingency" || zone == "inPlay") {
                runes[eb].zone = "inBag";
            }
        }

        // save new rune location and reset void rune
        actor.update({"data.runes": runes, "data.void.zone": "inHand"});
        console.log("Runes Cleaned Up");
    }

    _onHealAll(event) {
        event.preventDefault();
        console.log("Heal All Runes");

        //get actor reference
        let actor = game.actors.get(this.object.data._id);
        let data = actor.data;

        let essenceBag = this.object.data.data.essenceBag;
        let runes = data.data.runes;

        for (const eb of essenceBag) {
            runes[eb].zone = "inBag";
        }

        actor.update({"data.runes": runes, "data.void.zone": "inHand"});
        console.log("All Runes Back In Bag");
    }

    async _onDrop(event) {
        event.preventDefault();

        //get actor reference
        let actor = game.actors.get(this.object.data._id);
        
        //get new zone
        let element = event.target;
        console.log(element);
        let zone = element.dataset.zone;

        //get rune being dropped
        let html = event.dataTransfer.getData("text/html");
        let placeholder = document.createElement('div');
        placeholder.innerHTML = html;
        let source = placeholder.firstElementChild;
        let id = source.getAttribute("id");

        console.log(id);
        console.log(zone);

        //update rune zone
        if (id == "void") {
            if (zone == "inPlay" || zone == "contingency" || zone == "inHand") {
                actor.update( {"data.void.zone" : zone } );
            }
            else if (zone == "inBag") {
                ui.notifications.error("Void Rune cannot be placed in Essence Bag");
            }
            else if (zone == "stun" || zone == "wounds" || zone == "death" || zone == "drain") {
                ui.notifications.error("Void Rune cannot be placed in Damage Track");
            }
        }
        else {
            let runeUpdate = `data.runes.${id}.zone`;
            actor.update( { [`${runeUpdate}`] : zone } );
        }
        
    }
}