export const envConfig = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_PROJECT_ID),
  appwriteApiUrl: String(import.meta.env.VITE_API),
  appwriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_COLLECTION_ID),
  appwriteAssetStorageId: String(import.meta.env.VITE_BUCKET_ID),
  tinyMceApiKEy: String(import.meta.env.VITE_TINY_MCE_API_KEY),
};
