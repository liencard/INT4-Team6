import AncestorStore from "./AncestorStore";
import { decorate, computed } from "mobx";

class RootStore {
    constructor() {
        this.ancestorStore = new AncestorStore(this);
    }

}

export default RootStore;
