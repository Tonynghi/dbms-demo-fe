export type GetAllImagesRequest = {
  pagination?: boolean;
  pageSize: number;
  pageNumber: number;
  filename?: string;
};

export type UploadImageRequest = {
  filename: string;
  description: string;
  file: File;
};

export type GetImageDataRequest = {
  id: string;
};

export type GetImageFileRequest = {
  id: string;
};

export type DeleteImageRequest = {
  id: string;
};
