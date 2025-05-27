import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../firebase";
import { useParams } from "react-router-dom";

const RedirectUrl = () => {
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    const fetchUrl = async () => {
      const response = await getDoc(doc(db, "shortner", id));
      console.log(response);
      if (response.exists()) {
        // console.log("long url", response.data());
        window.location.href = response.data().longUrl;
      } else {
        console.log("URL not found");
      }
    };
    //fetch the URL from Firestore
    fetchUrl();
  }, [id]);

  return <div className="w-full text-center">Loading...</div>;
};

export default RedirectUrl;
