import { createContext } from "react";
import RootStore from "../stores";

const store = new RootStore();

const loadAllData = async () => {
    await store.ancestorStore.loadAllAncestors();
};

loadAllData();

window.store = store;
export const storeContext = createContext(store);