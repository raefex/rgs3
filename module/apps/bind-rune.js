export default class BindRune extends DocumentSheet {

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            template: "systems/rgs3/templates/apps/bind-rune.hbs",
            classes: ["rgs3"],
            height: "auto"
        });
    }

    get title() {
        return `${game.i18n.localize("rgs3.essenceAssignment.title")}`;
    }


    activateListeners(html) {
        html.find('.toggle-box').click(this._onToggleRuneVisibility.bind(this));

        super.activateListeners(html);
    }

    _onToggleRuneVisibility(event) {
        let element = event.currentTarget;
        let r = element.closest(".rune-display");
        r.classList.toggle("unbound");
    }

}

