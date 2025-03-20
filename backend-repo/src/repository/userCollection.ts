import { User } from "../entities/user";
import { db } from "../config/firebaseConfig";

const USERS_COLLECTION = "users";
// create user collection
type UserData = {
  displayName?: string;
  phoneNumber?: string;
  address?: string;
};

// update user collection
export const updateUserData = async (
  uuid: string,
  data: UserData
): Promise<{ success: boolean; updatedData?: any }> => {
  const userSnapshot = await db
    .collection(USERS_COLLECTION)
    .where("uuid", "==", uuid)
    .get();

  if (userSnapshot.empty) {
    throw new Error("User not found!");
  }

  const userRef = userSnapshot.docs[0].ref;
  await userRef.update(data);

  //   fetch new user data
  const updatedDoc = await userRef.get();
  const updatedData = updatedDoc.data();

  return { success: true, updatedData };
};

// fetch users collection
export const fetchAllUser = async (): Promise<User[]> => {
  const snapshot = await db.collection(USERS_COLLECTION).get();
  return snapshot.docs.map((doc) => doc.data() as User);
};
