import { decorate, observable, action } from 'mobx';

class Bookmark {
  constructor({ id, store, ...json }) {
    this.id = id;
    if (!store) {
      throw new Error('voorzie een store');
    }
    this.store = store;
    this.updateFromJson(json);
    this.store.addBookmark(this);
  }

  updateFromJson = ({ name = undefined, birthdate = undefined, deathdate = undefined }) => {
    this.name = name !== undefined ? name : this.name;
    this.birthdate = birthdate !== undefined ? birthdate : this.birthdate;
    this.deathdate = deathdate !== undefined ? deathdate : this.deathdate;
  };
}

decorate(Bookmark, {
  name: observable,
  birthdate: observable,
  deathdate: observable,
  updateFromJson: action,
});

export default Bookmark;
