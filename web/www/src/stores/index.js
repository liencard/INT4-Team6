import AncestorStore from "./AncestorStore";
import UserStore from './UserStore';
import BookmarkStore from './BookmarkStore';
import UiStore from './UiStore';

class RootStore {
    constructor() {
        this.ancestorStore = new AncestorStore(this);
        this.userStore = new UserStore(this);
        this.bookmarkStore = new BookmarkStore(this);
        this.uiStore = new UiStore(this);
    }

}

export default RootStore;
