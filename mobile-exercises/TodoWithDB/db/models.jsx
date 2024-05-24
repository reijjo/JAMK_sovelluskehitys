import Realm from 'realm';

export class Todo extends Realm.Object {
  static schema = {
    name: 'Todo',
    properties: {
      _id: 'objectId',
      text: {type: 'string'},
    },
    primaryKey: '_id',
  };
}
