import { createContext } from "react";
import RootStore from "../stores";
import User from '../models/UserModel';

const store = new RootStore();

const user1 = new User({
    id: "6e8baf11-bb77-3f6b-97d1-69b8e51c2ebe",
    name: 'Ethan Cole',
    avatar: './assets/img/ancestor_george.png',
    store: store.userStore
}); 

const loadAllData = async () => {
    await store.ancestorStore.loadAllAncestors();
    await store.userStore.loadAllUsers();
    await store.uiStore.setCurrentUser(store.userStore.resolveUser("4e8baf11-bb77-3f6b-97d1-69b8e51c2ebe"));
    //await store.uiStore.setCurrentUser(user1);
   
};

loadAllData();

window.store = store;
export const storeContext = createContext(store);