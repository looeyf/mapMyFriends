import db from '../services/firebase';

const ref = db.ref('friends');

export function index() {
  return ref.orderByKey();
}

export async function create(dataObject) {
  return await ref.push(dataObject);
}

export async function update(childKey, dataObject) {
  return await ref.child(childKey).update(dataObject);
}

export async function remove(childKey) {
  return await ref.child(childKey).remove();
}
