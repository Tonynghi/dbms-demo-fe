export type ImageData = {
  _id: string;
  filename: string;
  description: string;
  // data:
  createdAt: string;
  createdBy: string;
  lastUpdatedAt: number;
  deletedAt?: number;
};

export type GetAllImagesResponse = {
  total: number;
  pageCount: number;
  pageSize: number;
  images: Array<ImageData>;
};

export type GetImageDataResponse = { image: ImageData };
