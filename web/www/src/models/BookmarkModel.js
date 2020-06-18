import { decorate, observable, action, computed } from 'mobx';

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

  create = async () => this.store.createBookmark(this.asJson);

  updateFromJson = ({
    name = undefined,
    birthdate = undefined,
    deathdate = undefined,
  }) => {
    this.name = name !== undefined ? name : this.name;
    this.birthdate = birthdate !== undefined ? birthdate : this.birthdate;
    this.deathdate = deathdate !== undefined ? deathdate : this.deathdate;
    // hier moet dan nog user_id & ancestor_id gedefieerd worden?
  };

  get asJson() {
    return {
      id: this.id,
      birthdate: this.birthdate,
      deathdate: this.deathdate,
    };
  }
}

decorate(Bookmark, {
  name: observable,
  birthdate: observable,
  deathdate: observable,
  updateFromJson: action,
  asJson: computed
});

export default Bookmark;
