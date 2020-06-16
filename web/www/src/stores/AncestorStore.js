import RestService from "../services/RestService";
import { decorate, observable, action } from "mobx";
import Ancestor from "../models/AncestorModel";

class AncestorStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.ancestors = [];
    this.ancestorsService = new RestService('ancestors');
  }

  loadAllAncestors = async () => {
    const jsonAncestors = await this.ancestorsService.getAll();
    jsonAncestors.forEach((json) => this.updateAncestorFromServer(json));
  };

  addAncestor = (ancestor) => {
    this.ancestors.push(ancestor);
  };

  get allAncestors() {
    return this.ancestors
  }

  updateAncestorFromServer(json) {
    let ancestor = this.ancestors.find((ancestor) => ancestor.id === json.id);
    if (!ancestor) {
      ancestor = new Ancestor({
        id: json.id,
        store: this.rootStore.ancestorStore,
      });
    }
    if (json.isDeleted) {
      this.ancestors.remove(ancestor);
    } else {
      ancestor.updateFromJson(json);
    }
    return ancestor;
  }

  getAncestorById = (id) => this.ancestors.find((ancestor) => ancestor.id === id);
}

decorate(AncestorStore, {
  ancestors: observable,
  addAncestor: action,
  updateAncestorFromServer: action,
});

export default AncestorStore;
