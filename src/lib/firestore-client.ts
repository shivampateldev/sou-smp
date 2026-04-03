import {
  collection as fbCollection,
  doc as fbDoc,
  getDocs as fbGetDocs,
  getDoc as fbGetDoc,
  addDoc as fbAddDoc,
  updateDoc as fbUpdateDoc,
  deleteDoc as fbDeleteDoc,
  setDoc as fbSetDoc,
  query as fbQuery,
  where as fbWhere,
  orderBy as fbOrderBy,
  limit as fbLimit,
  onSnapshot as fbOnSnapshot,
  serverTimestamp as fbServerTimestamp,
  QueryConstraint
} from "firebase/firestore";
import { db as firebaseDb } from "../firebase";

// Redefine internal types to match the expected interface but bridge to SDK
export const db = firebaseDb;

export const collection = (_db: any, name: string) => 
  fbCollection(firebaseDb, name);

export const doc = (_db: any, collectionName: string, id: string) => 
  fbDoc(firebaseDb, collectionName, id);

export const where = (field: string, op: any, value: any) => 
  fbWhere(field, op, value);

export const orderBy = (field: string, direction: "asc" | "desc" = "asc") => 
  fbOrderBy(field, direction);

export const limit = (count: number) => 
  fbLimit(count);

export const query = (collectionRef: any, ...constraints: QueryConstraint[]) => 
  fbQuery(collectionRef, ...constraints);

export const getDocs = async (queryRef: any) => {
  return fbGetDocs(queryRef);
};

export const getDoc = async (docRef: any) => {
  return fbGetDoc(docRef);
};

export const onSnapshot = (queryRef: any, onNext: any, onError?: any) => {
  return fbOnSnapshot(queryRef, onNext, onError);
};

export const addDoc = async (collectionRef: any, data: any) => {
  return fbAddDoc(collectionRef, data);
};

export const updateDoc = async (docRef: any, data: any) => {
  return fbUpdateDoc(docRef, data);
};

export const setDoc = async (docRef: any, data: any) => {
  return fbSetDoc(docRef, data);
};

export const deleteDoc = async (docRef: any) => {
  return fbDeleteDoc(docRef);
};

export const serverTimestamp = () => fbServerTimestamp();
