// import { decorate, observable } from "mobx";
import { v4 } from "uuid";
import { decorate, observable, action } from "mobx";

class Ancestor {
  constructor({ id = v4(), store, ...json }) {
    this.id = id;
    if (!store) {
      throw new Error('voorzie een store');
    }
    this.store = store;
    this.updateFromJson(json);
    this.store.addAncestor(this);
  }

  updateFromJson = ({ name = undefined, coordinates = undefined, birthdate = undefined, deathdate = undefined}) => {
    this.name = (name !== undefined) ? name : this.name;
    this.coordinates = (coordinates !== undefined) ? coordinates : this.coordinates;
    this.birthdate = (birthdate !== undefined) ? birthdate : this.birthdate;
    this.deathdate = (deathdate !== undefined) ? deathdate : this.deathdate;
  };
}

 decorate(Ancestor, {
   name: observable,
   coordinates: observable,
   birthdate: observable,
   deathdate: observable,
   updateFromJson: action
 });


export default Ancestor;
