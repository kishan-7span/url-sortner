import React from "react";
import { DeleteIcon, EditIcon } from "../../public/icon";

const UrlListTable = ({
  arrayUrl,
  editRowId,
  setShortUrlInput,
  setEditRowId,
  handleUpdateUrl,
  handleEditUrl,
  shortUrlInput,
  handleDeleteUrl,
}) => {
  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Short URL
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Edit Url
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Delete Url
            </th>
          </tr>
        </thead>
        <tbody>
          {arrayUrl.map((url) => (
            <tr
              key={url.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
            >
              <td className="px-6 py-4">
                {editRowId === url.id ? (
                  <div className="flex px-3 py-3 border border-black outline-0 rounded-xl w-max">
                    <input
                      value="http://short.test:5173/"
                      disabled
                      className="w-min py-1 rounded-l"
                    />
                    <input
                      value={shortUrlInput}
                      onChange={(e) => setShortUrlInput(e.target.value)}
                      className="w-min border-b outline-0 px-2 py-1 rounded-r"
                    />
                  </div>
                ) : (
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {url.shortUrl}
                  </a>
                )}
              </td>
              <td className="px-6 py-4 text-center">
                {editRowId === url.id ? (
                  <button
                    className="bg-green-300 border border-green-500 text-black rounded-xl p-2"
                    onClick={() => handleUpdateUrl(url.id)}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditUrl(url.id, url.shortUrl)}
                    className="bg-gray-300 rounded-xl p-2"
                  >
                    <EditIcon />
                  </button>
                )}
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => handleDeleteUrl(url.id)}
                  className="bg-red-300 rounded-xl p-2 ml-2"
                  disabled={editRowId === url.id}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UrlListTable;
