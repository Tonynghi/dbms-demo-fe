export type GetAllImagesRequest = {
  pagination?: boolean;
  pageSize: number;
  pageNumber: number;
  filename?: string;
};

export type GetImageDataRequest = {
  id: string;
};

export type GetImageFileRequest = {
  id: string;
};
