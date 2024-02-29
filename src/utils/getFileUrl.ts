export const getFileUrl = (fileData: unknown) => {
  if (!fileData) return null;

  if (typeof fileData === "string") {
    return fileData;
  }

  if (typeof fileData === "object") {
    if (fileData === null) return null;
    if ("url" in fileData && typeof fileData.url === "string") {
      return fileData.url;
    }
  }

  throw new Error(
    "if your are using adomin file type with subType = 'custom', you must update the 'getFileUrl' function to get the file url"
  );
};
