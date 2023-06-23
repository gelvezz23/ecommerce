/* eslint-disable no-unused-vars */
// Create a new file under lib/appwrite.js

import { Client, Account, ID, Storage, Databases, Avatars } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6472b862859955d2f424");

const account = new Account(client);
const storage = new Storage(client);
const databases = new Databases(client);
const avatars = new Avatars(client);

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
    const response = await storage.listFiles("6472ba73b2685d1a2a36");
    response.files.forEach((items) => {
      const file = storage.getFilePreview("6472ba73b2685d1a2a36", items.$id);
      image.push(file.href);
    });
    return image;
  } catch (error) {
    return error;
  }
};

export const getOneImage = async (id) => {
  try {
    const response = await storage.getFilePreview("6472ba73b2685d1a2a36", id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async (id) => {
  try {
    const response = await storage.deleteFile("6472ba73b2685d1a2a36", id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createImage = async (file) => {
  try {
    const upload = await storage.createFile(
      "6472ba73b2685d1a2a36",
      ID.unique(),
      file
    );
    return upload;
  } catch (error) {
    console.log(error);
  }
};

export const getInformation = async () => {
  try {
    const response = await databases.listDocuments(
      "6472b9be26f13a8cc040",
      "6472b9e9bd1684389eb6"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const createProduct = async (data) => {
  const response = await databases.createDocument(
    "6472b9be26f13a8cc040",
    "6472b9e9bd1684389eb6",
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
export const crearPredido = async (data) => {
  try {
    const response = await databases.createDocument(
      "6472b9be26f13a8cc040",
      "64890278abbf5478f6ed",
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
      "6472b9be26f13a8cc040",
      "6472b9e9bd1684389eb6",
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
      "6472b9be26f13a8cc040",
      "64890278abbf5478f6ed"
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
