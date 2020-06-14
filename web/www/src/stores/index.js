import AncestorStore from "./AncestorStore";
import UserStore from './UserStore';
import UiStore from './UiStore';

class RootStore {
    constructor() {
        this.ancestorStore = new AncestorStore(this);
        this.userStore = new UserStore(this);
        this.uiStore = new UiStore(this);
    }

}

export default RootStore;
