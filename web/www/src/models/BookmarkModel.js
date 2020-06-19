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
  delete = async () => this.store.deleteBookmark(this.asJson);

  updateFromJson = ({
    name = undefined,
    birthdate = undefined,
    deathdate = undefined,
    user_id = undefined,
    ancestor_id = undefined,
  }) => {
    this.name = name !== undefined ? name : this.name;
    this.birthdate = birthdate !== undefined ? birthdate : this.birthdate;
    this.deathdate = deathdate !== undefined ? deathdate : this.deathdate;
    this.user_id = user_id !== undefined ? user_id : this.user_id;
    this.ancestor_id = ancestor_id !== undefined ? ancestor_id : this.ancestor_id;
  };

  get asJson() {
    return {
      id: this.id,
      birthdate: this.birthdate,
      deathdate: this.deathdate,
      user_id: this.user_id,
      ancestor_id: this.ancestor_id,
    };
  }
}

decorate(Bookmark, {
  name: observable,
  birthdate: observable,
  deathdate: observable,
  user_id: observable,
  ancestor_id: observable,
  updateFromJson: action,
  asJson: computed,
  create: action,
  delete: action
});

export default Bookmark;
