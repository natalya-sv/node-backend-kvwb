import { combineFoldersAndAlbums } from "./utils.js";

const folders = [
  { _id: "folder-id-1", year: "2023", folder_cover_photo: "cover-photo" },
  { _id: "folder-id-2", year: "2022", folder_cover_photo: "cover-photo" },
];
test("lists are empty", () => {
  expect(combineFoldersAndAlbums([], [])).toStrictEqual([]);
});

test("Folders/Albums list is null", () => {
  const errorMessage = "Invalid data, check input and try again!";
  const regex = new RegExp("^" + errorMessage + "$");
  expect(() => combineFoldersAndAlbums([], null)).toThrow(errorMessage);
  expect(() => combineFoldersAndAlbums(null, [])).toThrow(regex);
  expect(() => combineFoldersAndAlbums(null, null)).toThrow(errorMessage);
});

test("One Folder has albums", () => {
  const albums = [
    {
      folder_id: "folder-id-1",
      title: "Maandag 17 juli 2023 Dag 1",
      album_cover_photo: "cover",
      album_link: "link",
    },
    {
      folder_id: "folder-id-1",
      title: "Maandag 25 juli 2022 social media",
      album_cover_photo: "cover",
      album_link: "link",
    },
    {
      folder_id: "folder-id-1",
      title: "2023-07-17 KVW Brandev. dag 1",
      album_cover_photo: "cover",
      album_link: "link",
    },
  ];
  const oneFolderHasAlbums = [
    {
      id: "folder-id-1",
      year: "2023",
      folder_cover_photo: "cover-photo",
      albums: [
        {
          folder_id: "folder-id-1",
          title: "Maandag 17 juli 2023 Dag 1",
          album_cover_photo: "cover",
          album_link: "link",
        },
        {
          folder_id: "folder-id-1",
          title: "Maandag 25 juli 2022 social media",
          album_cover_photo: "cover",
          album_link: "link",
        },
        {
          folder_id: "folder-id-1",
          title: "2023-07-17 KVW Brandev. dag 1",
          album_cover_photo: "cover",
          album_link: "link",
        },
      ],
    },
    {
      id: "folder-id-2",
      year: "2022",
      folder_cover_photo: "cover-photo",
      albums: [],
    },
  ];
  expect(combineFoldersAndAlbums(albums, folders)).toStrictEqual(
    oneFolderHasAlbums
  );
});

test("All folders have albums", () => {
  const albums = [
    {
      folder_id: "folder-id-1",
      title: "Maandag 17 juli 2023 Dag 1",
      album_cover_photo: "cover",
      album_link: "link",
    },
    {
      folder_id: "folder-id-1",
      title: "Maandag 25 juli 2022 social media",
      album_cover_photo: "cover",
      album_link: "link",
    },
    {
      folder_id: "folder-id-1",
      title: "2023-07-17 KVW Brandev. dag 1",
      album_cover_photo: "cover",
      album_link: "link",
    },
    {
      folder_id: "folder-id-2",
      title: "Maandag 17 juli 2023 Dag 1",
      album_cover_photo: "cover",
      album_link: "link",
    },
    {
      folder_id: "folder-id-2",
      title: "Maandag 25 juli 2022 social media",
      album_cover_photo: "cover",
      album_link: "link",
    },
    {
      folder_id: "folder-id-2",
      title: "2023-07-17 KVW Brandev. dag 1",
      album_cover_photo: "cover",
      album_link: "link",
    },
  ];
  const allFoldersHaveAlbums = [
    {
      id: "folder-id-1",
      year: "2023",
      folder_cover_photo: "cover-photo",
      albums: [
        {
          folder_id: "folder-id-1",
          title: "Maandag 17 juli 2023 Dag 1",
          album_cover_photo: "cover",
          album_link: "link",
        },
        {
          folder_id: "folder-id-1",
          title: "Maandag 25 juli 2022 social media",
          album_cover_photo: "cover",
          album_link: "link",
        },
        {
          folder_id: "folder-id-1",
          title: "2023-07-17 KVW Brandev. dag 1",
          album_cover_photo: "cover",
          album_link: "link",
        },
      ],
    },
    {
      id: "folder-id-2",
      year: "2022",
      folder_cover_photo: "cover-photo",
      albums: [
        {
          folder_id: "folder-id-2",
          title: "Maandag 17 juli 2023 Dag 1",
          album_cover_photo: "cover",
          album_link: "link",
        },
        {
          folder_id: "folder-id-2",
          title: "Maandag 25 juli 2022 social media",
          album_cover_photo: "cover",
          album_link: "link",
        },
        {
          folder_id: "folder-id-2",
          title: "2023-07-17 KVW Brandev. dag 1",
          album_cover_photo: "cover",
          album_link: "link",
        },
      ],
    },
  ];
  expect(combineFoldersAndAlbums(albums, folders)).toStrictEqual(
    allFoldersHaveAlbums
  );
});

test("Some albums have reference to non existing folder", () => {
  const albumHasUnknownFolders = [
    {
      folder_id: "folder-id-1",
      title: "Maandag 17 juli 2023 Dag 1",
      album_cover_photo: "cover",
      album_link: "link",
    },
    {
      folder_id: "folder-id-1",
      title: "Maandag 25 juli 2022 social media",
      album_cover_photo: "cover",
      album_link: "link",
    },
    {
      folder_id: "folder-id-1",
      title: "2023-07-17 KVW Brandev. dag 1",
      album_cover_photo: "cover",
      album_link: "link",
    },
    {
      folder_id: "folder-id-3",
      title: "Maandag 17 juli 2023 Dag 1",
      album_cover_photo: "cover",
      album_link: "link",
    },
    {
      folder_id: "folder-id-3",
      title: "Maandag 25 juli 2022 social media",
      album_cover_photo: "cover",
      album_link: "link",
    },
    {
      folder_id: "folder-id-2",
      title: "2023-07-17 KVW Brandev. dag 1",
      album_cover_photo: "cover",
      album_link: "link",
    },
  ];
  const allFoldersHasAlbums = [
    {
      id: "folder-id-1",
      year: "2023",
      folder_cover_photo: "cover-photo",
      albums: [
        {
          folder_id: "folder-id-1",
          title: "Maandag 17 juli 2023 Dag 1",
          album_cover_photo: "cover",
          album_link: "link",
        },
        {
          folder_id: "folder-id-1",
          title: "Maandag 25 juli 2022 social media",
          album_cover_photo: "cover",
          album_link: "link",
        },
        {
          folder_id: "folder-id-1",
          title: "2023-07-17 KVW Brandev. dag 1",
          album_cover_photo: "cover",
          album_link: "link",
        },
      ],
    },
    {
      id: "folder-id-2",
      year: "2022",
      folder_cover_photo: "cover-photo",
      albums: [
        {
          folder_id: "folder-id-2",
          title: "2023-07-17 KVW Brandev. dag 1",
          album_cover_photo: "cover",
          album_link: "link",
        },
      ],
    },
  ];
  expect(
    combineFoldersAndAlbums(albumHasUnknownFolders, folders)
  ).toStrictEqual(allFoldersHasAlbums);
});
