export default class RGS3Item extends Item {
    prepareData() {
        super.prepareData();

        //const itemData = this.data;
        //const data = itemData.data;

        //console.log("prepareData: ", this.data);

        // reset and calculate QR total
        this.data.data.qrTotal = 0;

        for (const i of Object.entries(this.data.data.qr)) {
            //console.log("qr entry: ", i);
            this.data.data.qrTotal += parseInt(i[1].cost) * parseInt(i[1].value);
            //console.log("qrTotal: ", this.data.data.qrTotal);
        }
    }
}