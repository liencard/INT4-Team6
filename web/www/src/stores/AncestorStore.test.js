
import Ancestor from '../models/AncestorModel';
import RootStore from '.';
import AncestorStore from './AncestorStore';

test('Create a new AncestorStore', () => {
  const store = new AncestorStore();
  expect(store.ancestors).toBeInstanceOf(Array);
  expect(store.ancestors.length).toBe(0);
});

test('Find ancestor by the id', () => {
  const store = new AncestorStore();
  const ancestor = new Ancestor({ name: 'testancestor', store });
  const id = ancestor.id;
  expect(store.getAncestorById(id)).toBe(ancestor);
});

test('updateAncestorFromServer returns a new ancestor when json is passed in', () => {
  const store = new RootStore();
  const ancestor = store.ancestorStore.updateAncestorFromServer({
    name: 'testancestor',
  });
  expect(ancestor).toBeInstanceOf(Ancestor);
  expect(ancestor.name).toBe('testancestor');
});

test('updateAncestorFromServer updates an existing ancestor', () => {
  const store = new RootStore();
  const ancestor = new Ancestor({
    name: 'testancestor',
    store: store.ancestorStore,
  }); 
  const updateAncestor = store.ancestorStore.updateAncestorFromServer({
    id: ancestor.id,
    name: 'testancestorupdated',
  });
  expect(updateAncestor.id).toBe(ancestor.id);
  expect(updateAncestor.name).toBe('testancestorupdated');
  expect(updateAncestor).toBe(ancestor);
});


