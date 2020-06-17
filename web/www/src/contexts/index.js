import { createContext } from "react";
import RootStore from "../stores";
import User from '../models/UserModel';

const store = new RootStore();

const loadAllData = async () => {
    await store.userStore.loadAllUsers();
    store.uiStore.setCurrentUser(store.userStore.resolveUser("4e8baf11-bb77-3f6b-97d1-69b8e51c2ebe"));
    await store.bookmarkStore.loadAllBookmarks();
    await store.ancestorStore.loadAllAncestors();
};

loadAllData();

window.store = store;
export const storeContext = createContext(store);