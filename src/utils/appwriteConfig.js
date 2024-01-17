/* eslint-disable no-unused-vars */
// Create a new file under lib/appwrite.js

import {
  Client,
  Account,
  ID,
  Storage,
  Databases,
  Avatars,
  Query,
} from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65a7ff9ee4241b758bfe");

const account = new Account(client);
const storage = new Storage(client);
const databases = new Databases(client);
const avatars = new Avatars(client);

const databaseId = "65a8013fdd232d57efd3";
const bucketId = "65a802b0246b94944050";
const collectionIdIcecreams = "65a8015159adcca6121e";
const collectionIdPedidos = "65a8015f695286a20312";

export const createUser = async (email, password, name) => {
  try {
    const response = await account.create(ID.unique(), email, password, name);

    return response;
  } catch (error) {
    return error;
  }
};

export const LoginSession = async (email, password) => {
  try {
    const response = await account.createEmailSession(email, password);
    const userDetails = await account.get();
    sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
    return response;
  } catch (error) {
    return error;
  }
};

export const LogOutSession = async () => {
  try {
    const response = await account.deleteSessions();
    sessionStorage.removeItem("userDetails");
    return response;
  } catch (error) {
    return error;
  }
};

export const getAvatar = async () => {
  try {
    const response = avatars.getInitials();
    return response.href;
  } catch (error) {
    return error;
  }
};

export const getImages = async () => {
  try {
    const image = [];
    const response = await storage.listFiles(bucketId);
    response.files.forEach((items) => {
      const file = storage.getFilePreview(bucketId, items.$id);
      image.push(file.href);
    });
    return image;
  } catch (error) {
    return error;
  }
};

export const getOneImage = async (id) => {
  try {
    const response = await storage.getFilePreview(bucketId, id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async (id) => {
  try {
    const response = await storage.deleteFile(bucketId, id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createImage = async (file) => {
  try {
    const upload = await storage.createFile(bucketId, ID.unique(), file);
    return upload;
  } catch (error) {
    console.log(error);
  }
};

export const getInformation = async () => {
  try {
    const response = await databases.listDocuments(
      databaseId,
      collectionIdIcecreams,
      [Query.limit(100)]
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const createProduct = async (data) => {
  const response = await databases.createDocument(
    databaseId,
    collectionIdIcecreams,
    ID.unique(),
    {
      name: data.name,
      price: data.price,
      image: data.image,
      description: data.description,
    }
  );
  return response;
};

export const updateProduct = async (data, id) => {
  const response = await databases.updateDocument(
    databaseId,
    collectionIdIcecreams,
    id,
    {
      name: data.name,
      price: data.price,
      image: data.image,
      description: data.description,
    }
  );
  return response;
};
export const crearPredido = async (data) => {
  try {
    const response = await databases.createDocument(
      databaseId,
      collectionIdPedidos,
      ID.unique(),
      {
        paymentMethod: data.paymentMethod,
        direccion: data.direccion,
        telefono: data.telefono,
        username: data.username,
        cantidad: String(data.quantity),
        productName: data.productName,
        price: data.price,
        description: data.description,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await databases.deleteDocument(
      databaseId,
      collectionIdIcecreams,
      id
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getOrdersData = async () => {
  try {
    const response = await databases.listDocuments(
      databaseId,
      collectionIdPedidos,
      [Query.limit(100)]
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
