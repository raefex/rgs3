export default class RGS3Actor extends Actor {
    prepareData() {
        super.prepareData();

        // get bound active runes and assign as Essence Bag
        let boundRunes = [];
        for (const r of Object.entries(this.data.data.runes)) {
            if (r[1].bound) {
                boundRunes.push(r[0]);
            }
        }
        this.data.data.essenceBag = boundRunes;

        // set essence value to number of bound runes
        this.data.data.essence = boundRunes.length;

        // set spent levels to sum of 2*destiny + essence
        this.data.data.level.spent = parseInt(this.data.data.essence) + 2 * parseFloat(this.data.data.destiny);

        //set health max to 3 * essence
        this.data.data.health.max = 3 * boundRunes.length;
        this.data.data.health.value = 3 * boundRunes.length;
    }
}