import { collection, getDocs, query, doc, getDoc, addDoc, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase-config";

/* 1. CREAR LA CONSTANTE DE LA COLECCION */

const collectionStr = 'cursos';

/* 2. CREAR & EXPORTAR TODOS LOS METODOS DEL CRUD */
export const onFindAll = async ()=>{
    const result = await getDocs(query(collection( db, collectionStr )));
    return result;
};

export const onFindById = async paramId => {
    const result = await getDoc(doc(db, collectionStr, paramId));
    return result.data();
};

export const onInsert =  async obj => {
    await addDoc(collection(db, collectionStr), obj);
}

export const onUpdate = async (paramId, newObj) => {
    await updateDoc(doc(db, collectionStr, paramId), newObj);
}

export const onDelete = async paramId => {
    await deleteDoc(doc(db, collectionStr, paramId));
}

//export default { onFindAll, onFindId, onInsert, onUpdate, onDelete }