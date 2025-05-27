import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { EditIcon } from "../../public/icon";
import UrlListTable from "./url-list-table";

const UrlShortenerHome = () => {
  const [longUrl, setLongUrl] = useState("");
  const [editRowId, setEditRowId] = useState(null);
  const [shortUrlInput, setShortUrlInput] = useState("");
  const [arrayUrl, setArrayUrl] = useState([]);
  const [customeEndPoint, setCustomeEndPoint] = useState("");
  const [generateAuto, setGenerateAuto] = useState(true);
  //will generate 7 character unique id from a-z, A-Z, 0-9
  const getId = async () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";
    for (let i = 0; i < 7; i++) {
      id += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    // Check if the generated ID already exists in the arrayUrl state
    const ref = doc(db, "shortner", id);
    const existsId = (await getDoc(ref)).exists();
    return existsId ? getId() : id;
  };

  //get all detail from firebases collection
  useEffect(() => {
    fetchUrls();
  }, []);

  //get all URLs from Firestore and set them to state
  const fetchUrls = async () => {
    const collectionRef = collection(db, "shortner");
    const response = await getDocs(collectionRef);
    if (response) {
      const urls = response.docs.map((doc) => ({
        longUrl: doc.data().longUrl,
        shortUrl: doc.data().shortUrl,
        id: doc.id,
      }));
      console.log(urls);
      setArrayUrl(urls);
    }
  };
  //handle submition of longURl to firebase and create a short Url
  const handleSubmit = async () => {
    if (!longUrl) return alert("Please enter a long URL");

    const id = !generateAuto ? customeEndPoint : await getId();
    if (!generateAuto && id.trim() === "") {
      return alert("Please enter a custom endpoint");
    }
    //windows location.origin will give the current URL of the page
    const shortUrl = window.location.origin + "/" + id;

    //set URL to local to access
    setArrayUrl((prev) => [
      ...prev,
      { longUrl: longUrl, shortUrl: shortUrl, id: id },
    ]);
    const ref = doc(db, "shortner", id);
    const existsId = await getDoc(ref);
    if (!existsId.exists()) {
      await setDoc(doc(db, "shortner", id), {
        longUrl: longUrl,
        shortUrl: shortUrl,
      });
    } else {
      alert(
        "This custome short URL already exists, please try a different one."
      );
      return;
    }

    setLongUrl("");
    setCustomeEndPoint("");
    setGenerateAuto(true); // Reset to auto-generate after submission
  };
  //edit Url
  const handleEditUrl = (id, shortUrl) => {
    const sliced = shortUrl.split("/").pop(); // gets text after last /
    setShortUrlInput(sliced);
    setEditRowId(id);
  };

  //update document and field in firebase
  const handleUpdateUrl = async (id) => {
    const oldRef = doc(db, "shortner", id);
    const newRef = doc(db, "shortner", shortUrlInput);

    const snapshot = await getDoc(oldRef);
    console.log("snapshot", snapshot.exists(), snapshot.data());
    if (snapshot.exists()) {
      const data = snapshot.data();
      data.shortUrl = `http://short.test:5173/${shortUrlInput}`;
      console.log(data);
      await setDoc(newRef, data);
      await deleteDoc(oldRef);
    }
    setEditRowId(null);
    setShortUrlInput("");
    fetchUrls(); // Refresh the list after update
  };

  return (
    <div className="w-full flex flex-col justify-center gap-2">
      <h1 className="font-bold text-lg text-center py-2">URl shortner</h1>
      <input
        className="px-3 py-3 border border-black outline-0 rounded-xl w-full"
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Place your Url here"
      />
      <label className="text-lg text-start font-semibold w-full">
        Custom End Point:
      </label>

      <div className="flex  gap-2">
        <input
          className={`px-3 py-3 border border-black outline-0 rounded-xl w-full ${
            generateAuto ? "bg-gray-200" : "bg-white"
          }`}
          type="text"
          value={customeEndPoint}
          onChange={(e) => setCustomeEndPoint(e.target.value)}
          placeholder="Place Cutome End Point"
          disabled={generateAuto}
        />
        <input
          type="checkbox"
          className="p-3 w-3"
          checked={generateAuto}
          onChange={() => setGenerateAuto(!generateAuto)}
        />
      </div>
      <button
        className="w-min border border-pink-300  outline-0 rounded-xl px-5 py-3"
        onClick={handleSubmit}
      >
        Shorten
      </button>
      {arrayUrl.length > 0 && (
        <div className="mt-4 flex flex-col">
          <p className="text-lg font-semibold">Shortened URL:</p>
          <UrlListTable
            arrayUrl={arrayUrl}
            editRowId={editRowId}
            setEditRowId={setEditRowId}
            setShortUrlInput={setShortUrlInput}
            handleEditUrl={handleEditUrl}
            handleUpdateUrl={handleUpdateUrl}
            shortUrlInput={shortUrlInput}
          />
        </div>
      )}
    </div>
  );
};

export default UrlShortenerHome;
