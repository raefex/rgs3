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

        /* ----------------- */
        /* Active Power Data */
        /* ----------------- */

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

        /* ----------------- */
        /* Social Power Data */
        /* ----------------- */

        powerList = [];
        availableList = [{}];

        //get bound social runes with associated powers
        for (const s of Object.entries(data.data.runes)) {
            if (s[1].boundSocial) {
                powerList.push(s[1]);
            }
            else {
                availableList.push(s[1]);
            }
        }
        data.socialList = powerList;
        data.unboundSocialRunes = availableList;

        // get unbound social powers
        data.socials = data.items.filter(function (item) { return (item.type == "Social" && item.data.rune.symbol === "") } );
        data.socialsToDisplay = data.items.filter(function (item) {return (item.type == "Social" && item.data.rune.symbol != "") } );

        /* ---------------- */
        /* Skill Power Data */
        /* ---------------- */

        powerList = [];
        availableList = [{}];

        //get bound skill runes with associated powers
        for (const k of Object.entries(data.data.runes)) {
            if (k[1].boundSkill) {
                powerList.push(k[1]);
            }
            else {
                availableList.push(k[1]);
            }
        }
        data.skillList = powerList;
        data.unboundSkillRunes = availableList;

        //get unbound skill powers
        data.skills = data.items.filter(function (item) { return (item.type ==="Skill" && item.data.rune.symbol === "") } );
        data.skillsToDisplay = data.items.filter(function (item) {return (item.type == "Skill" && item.data.rune.symbol != "") } );

        /* ------------------ */
        /* Passive Power Data */
        /* ------------------ */

        powerList = [];
        availableList = [{}];

        // get bound passive runes with associated powers
        for (const p of Object.entries(data.data.runes)) {
            if (p[1].boundPassive) {
                powerList.push(p[1]);
            }
            else {
                availableList.push(p[1]);
            }
        }
        data.passiveList = powerList;
        data.unboundPassiveRunes = availableList;

        // get unbound passive powers        
        data.passives = data.items.filter(function (item) { return (item.type == "Passive" && item.data.rune.symbol === "") } );
        data.passivesToDisplay = data.items.filter(function (item) {return (item.type == "Passive" && item.data.rune.symbol != "") } );

        data.gear = data.items.filter(function (item) { return item.type == "Equipment" });

        return data;
    }

    activateListeners(html) {
        html.find(".active-bind").click(this._onItemActivePowerBind.bind(this));
        html.find(".social-bind").click(this._onItemSocialPowerBind.bind(this));
        html.find(".passive-bind").click(this._onItemPassivePowerBind.bind(this));
        html.find(".skill-bind").click(this._onItemSkillPowerBind.bind(this));

        super.activateListeners(html);
    }

    _onItemActivePowerBind(event) {

        event.preventDefault();
        let element = event.currentTarget;

        console.log("Binding Active Power");
        
        let itemId = this.object.data.data.selectedValues.selectedActivePower;
        let runeName = this.object.data.data.selectedValues.selectedActiveRune;
        

        let actor = game.actors.get(this.object.data._id);
        let data = actor.data;

        console.log(itemId);
        console.log(runeName);
        
        data.data.runes[runeName].activePower = itemId;
        data.data.runes[runeName].boundActive = true;

        let itemUpdate = actor.getOwnedItem(itemId);
        let idUpdate = `data.runes.${runeName}.activePower`;
        let boolUpdate = `data.runes.${runeName}.boundActive`;

        actor.update({[`${idUpdate}`] : itemId });
        actor.update({[`${boolUpdate}`] : true });
        
        const rs = "data.rune.symbol";
        itemUpdate.update({[`${rs}`]: runeName});

        this.render(true);

        console.log(actor);
    }

    _onItemSocialPowerBind(event) {

        event.preventDefault();
        let element = event.currentTarget;

        console.log("Binding Social Power");
        
        let itemId = this.object.data.data.selectedValues.selectedSocialPower;
        let runeName = this.object.data.data.selectedValues.selectedSocialRune;
        

        let actor = game.actors.get(this.object.data._id);
        let data = actor.data;

        console.log(itemId);
        console.log(runeName);
        
        data.data.runes[runeName].socialPower = itemId;
        data.data.runes[runeName].boundSocial = true;

        let itemUpdate = actor.getOwnedItem(itemId);
        let idUpdate = `data.runes.${runeName}.socialPower`;
        let boolUpdate = `data.runes.${runeName}.boundSocial`;
        
        actor.update({[`${idUpdate}`] : itemId });
        actor.update({[`${boolUpdate}`] : true });
        
        const rs = "data.rune.symbol";
        itemUpdate.update({[`${rs}`]: runeName});

        this.render(true);

        console.log(actor);
    }

    _onItemSkillPowerBind(event) {

        event.preventDefault();
        let element = event.currentTarget;

        console.log("Binding Skill");
        
        let itemId = this.object.data.data.selectedValues.selectedSkillPower;
        let runeName = this.object.data.data.selectedValues.selectedSkillRune;
        

        let actor = game.actors.get(this.object.data._id);
        let data = actor.data;

        console.log(itemId);
        console.log(runeName);
        
        data.data.runes[runeName].skill = itemId;
        data.data.runes[runeName].boundSkill = true;

        let itemUpdate = actor.getOwnedItem(itemId);
        let idUpdate = `data.runes.${runeName}.skill`;
        let boolUpdate = `data.runes.${runeName}.boundSkill`;
        
        actor.update({[`${idUpdate}`] : itemId });
        actor.update({[`${boolUpdate}`] : true });
        
        const rs = "data.rune.symbol";
        itemUpdate.update({[`${rs}`]: runeName});

        this.render(true);

        console.log(actor);
    }

    _onItemPassivePowerBind(event) {

        event.preventDefault();
        let element = event.currentTarget;

        console.log("Binding Passive Power");
        
        let itemId = this.object.data.data.selectedValues.selectedPassivePower;
        let runeName = this.object.data.data.selectedValues.selectedPassiveRune;
        

        let actor = game.actors.get(this.object.data._id);
        let data = actor.data;

        console.log(itemId);
        console.log(runeName);
        
        data.data.runes[runeName].passivePower = itemId;
        data.data.runes[runeName].boundPassive = true;

        let itemUpdate = actor.getOwnedItem(itemId);
        let idUpdate = `data.runes.${runeName}.passivePower`;
        let boolUpdate = `data.runes.${runeName}.boundPassive`;
        
        actor.update({[`${idUpdate}`] : itemId });
        actor.update({[`${boolUpdate}`] : true });
        
        const rs = "data.rune.symbol";
        itemUpdate.update({[`${rs}`]: runeName});

        this.render(true);

        console.log(actor);
    }
}