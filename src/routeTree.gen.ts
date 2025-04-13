/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './features/~__root';
import { Route as IndexImport } from './features/~index';
import { Route as GalleryUploadImport } from './features/~gallery/~upload';
import { Route as GalleryIndexImport } from './features/~gallery/~index';
import { Route as GalleryIdIndexImport } from './features/~gallery/~$id/~index';

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any);

const GalleryUploadRoute = GalleryUploadImport.update({
  id: '/gallery/upload',
  path: '/gallery/upload',
  getParentRoute: () => rootRoute,
} as any);

const GalleryIndexRoute = GalleryIndexImport.update({
  id: '/gallery/',
  path: '/gallery/',
  getParentRoute: () => rootRoute,
} as any);

const GalleryIdIndexRoute = GalleryIdIndexImport.update({
  id: '/gallery/$id/',
  path: '/gallery/$id/',
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    '/gallery/': {
      id: '/gallery/';
      path: '/gallery';
      fullPath: '/gallery';
      preLoaderRoute: typeof GalleryIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/gallery/upload': {
      id: '/gallery/upload';
      path: '/gallery/upload';
      fullPath: '/gallery/upload';
      preLoaderRoute: typeof GalleryUploadImport;
      parentRoute: typeof rootRoute;
    };
    '/gallery/$id/': {
      id: '/gallery/$id/';
      path: '/gallery/$id';
      fullPath: '/gallery/$id';
      preLoaderRoute: typeof GalleryIdIndexImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute;
  '/gallery': typeof GalleryIndexRoute;
  '/gallery/upload': typeof GalleryUploadRoute;
  '/gallery/$id': typeof GalleryIdIndexRoute;
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute;
  '/gallery': typeof GalleryIndexRoute;
  '/gallery/upload': typeof GalleryUploadRoute;
  '/gallery/$id': typeof GalleryIdIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/': typeof IndexRoute;
  '/gallery/': typeof GalleryIndexRoute;
  '/gallery/upload': typeof GalleryUploadRoute;
  '/gallery/$id/': typeof GalleryIdIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: '/' | '/gallery' | '/gallery/upload' | '/gallery/$id';
  fileRoutesByTo: FileRoutesByTo;
  to: '/' | '/gallery' | '/gallery/upload' | '/gallery/$id';
  id: '__root__' | '/' | '/gallery/' | '/gallery/upload' | '/gallery/$id/';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  GalleryIndexRoute: typeof GalleryIndexRoute;
  GalleryUploadRoute: typeof GalleryUploadRoute;
  GalleryIdIndexRoute: typeof GalleryIdIndexRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  GalleryIndexRoute: GalleryIndexRoute,
  GalleryUploadRoute: GalleryUploadRoute,
  GalleryIdIndexRoute: GalleryIdIndexRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "~__root.tsx",
      "children": [
        "/",
        "/gallery/",
        "/gallery/upload",
        "/gallery/$id/"
      ]
    },
    "/": {
      "filePath": "~index.tsx"
    },
    "/gallery/": {
      "filePath": "~gallery/~index.tsx"
    },
    "/gallery/upload": {
      "filePath": "~gallery/~upload.tsx"
    },
    "/gallery/$id/": {
      "filePath": "~gallery/~$id/~index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
