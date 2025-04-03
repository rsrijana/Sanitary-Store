import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc } from "firebase/firestore";
import { gapi } from "gapi-script";

const CLIENT_ID = "301062789293-jh9ked4l5hnoub9ihetcv7qcg1fv3skv.apps.googleusercontent.com";
const API_KEY = "AIzaSyCdbfRSanpGuq4eY5Jv0VV4GGRsOrOF78E";
const SCOPES = "https://www.googleapis.com/auth/drive.file";

const AdManager = ({ fetchAds }) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [link, setLink] = useState('');
    const [section, setSection] = useState('top');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const initClient = () => {
            try {
                gapi.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    scope: SCOPES,
                }).then(() => {
                    const authInstance = gapi.auth2.getAuthInstance();
                    if (!authInstance.isSignedIn.get()) {
                        authInstance.signIn();
                    }
                }).catch((error) => {
                    console.error("Error initializing Google API:", error);
                });
            } catch (error) {
                console.error("Error during client initialization:", error);
            }
        };

        gapi.load("client:auth2", initClient);
    }, []);


    const handleUpload = async () => {
        if (!title || !image || !link) {
            alert("Please fill all fields.");
            return;
        }

        setUploading(true);

        try {
            const authInstance = gapi.auth2.getAuthInstance();
            if (!authInstance.isSignedIn.get()) {
                await authInstance.signIn();
            }

            const accessToken = gapi.auth.getToken().access_token;

            const form = new FormData();
            form.append("metadata", new Blob([JSON.stringify({ name: image.name })], { type: "application/json" }));
            form.append("file", image);

            const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
                method: "POST",
                headers: new Headers({ Authorization: "Bearer " + accessToken }),
                body: form,
            });

            const data = await response.json();
            const imageUrl = `https://drive.google.com/uc?export=view&id=${data.id}`;

            await addDoc(collection(db, "ads"), {
                title,
                imageUrl,
                link,
                section,
                createdAt: new Date(),
            });

            alert("Ad uploaded successfully!");
            fetchAds();
            setTitle('');
            setImage(null);
            setLink('');
            setSection('top');
        } catch (error) {
            console.error("Error uploading ad:", error);
            alert("Failed to upload ad.");
        }

        setUploading(false);
    };

    return (
        <div className="p-4 border">
            <h2 className="text-lg font-bold mb-2">Ad Manager</h2>
            <input type="text" placeholder="Ad Title" className="border p-2 mb-2 w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="file" className="border p-2 mb-2 w-full" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            <input type="text" placeholder="Ad Link (https://example.com)" className="border p-2 mb-2 w-full" value={link} onChange={(e) => setLink(e.target.value)} />

            <select className="border p-2 mb-2 w-full" value={section} onChange={(e) => setSection(e.target.value)}>
                <option value="top">Top Advertisement</option>
                <option value="bottom">Bottom Advertisement</option>
            </select>

            <button className="bg-blue-600 text-white p-2 w-full" onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Ad"}
            </button>
        </div>
    );
};

export default AdManager;
