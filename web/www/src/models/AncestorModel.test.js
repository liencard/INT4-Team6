import Ancestor from './AncestorModel';
import RootStore from '../stores';

test('Create a new ancestor', () => {
  const store = new RootStore();
  const ancestor = new Ancestor({ name: 'Test', store: store.ancestorStore });
  expect(ancestor.name).toBe('Test');
});

test("Can't create a ancestor without a store", () => {
  expect(() => new Ancestor({ name: 'testuser' })).toThrow('voorzie een store');
});

test('Store must have a reference to a created ancestor', () => {
  const store = new RootStore();
  expect(store.ancestorStore.ancestors.length).toBe(0);
  const ancestor = new Ancestor({ name: 'testancestor', store: store.ancestorStore });
  expect(store.ancestorStore.ancestors.length).toBe(1);
  expect(store.ancestorStore.ancestors[0]).toStrictEqual(ancestor);
});

test('updateFromJson sets the correct properties of the ancestor', () => {
  const store = new RootStore();
  const ancestor = new Ancestor({
    name: 'testuser',
    birthdate: '2020',
    store: store.ancestorStore,
  });
  ancestor.updateFromJson({
    name: 'updated name',
    birthdate: 'updated birthdate',
  });
  expect(ancestor.name).toBe('updated name');
  expect(ancestor.birthdate).toBe('updated birthdate');
});

test('updateFromJson does not overwrite properties not passed in', () => {
  const store = new RootStore();
  const ancestor = new Ancestor({
    name: 'testuser',
    birthdate: '2020',
    store: store.ancestorStore,
  });
  ancestor.updateFromJson({
    birthdate: '2011',
  });
  expect(ancestor.name).toBe('testuser');
  expect(ancestor.birthdate).toBe('2011');
  ancestor.updateFromJson({
    name: 'updated name',
  });
  expect(ancestor.name).toBe('updated name');
  expect(ancestor.birthdate).toBe('2011');
});