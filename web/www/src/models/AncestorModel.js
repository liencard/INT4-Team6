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

  updateFromJson = ({
    name = undefined,
    coordinates = undefined,
    birthdate = undefined,
    deathdate = undefined,
    generation = undefined,
    img = undefined,
    intro = undefined,
    place = undefined,
    country = undefined,
    occupation = undefined,
    occupation_place = undefined,
    occurrence = undefined,
    occurrence_time = undefined,
    mapLat = undefined,
    mapLong = undefined,
  }) => {
    this.name = name !== undefined ? name : this.name;
    this.coordinates =
      coordinates !== undefined ? coordinates : this.coordinates;
    this.birthdate = birthdate !== undefined ? birthdate : this.birthdate;
    this.deathdate = deathdate !== undefined ? deathdate : this.deathdate;
    this.generation = generation !== undefined ? generation : this.generation;
    this.img = img !== undefined ? img : this.img;
    this.intro = intro !== undefined ? intro : this.intro;
    this.place = place !== undefined ? place : this.place;
    this.country = country !== undefined ? country : this.country;
    this.occupation = occupation !== undefined ? occupation : this.occupation;
    this.occupation_place =
      occupation_place !== undefined ? occupation_place : this.occupation_place;
    this.occurrence = occurrence !== undefined ? occurrence : this.occurrence;
    this.occurrence_time =
      occurrence_time !== undefined ? occurrence_time : this.occurrence_time;
    this.mapLat = mapLat !== undefined ? mapLat : this.mapLat;
    this.mapLong = mapLong !== undefined ? mapLong : this.mapLong;
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
