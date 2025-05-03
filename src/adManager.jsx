import React, {useState} from 'react';

const AdManager = ({fetchAds}) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [section, setSection] = useState('top');
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (!title || !image) {
            alert("Please fill all fields.");
            return;
        }

        setUploading(true);

        const reader = new FileReader();
        reader.onloadend = () => {
            const adData = {
                title,
                image: reader.result,
                section,
                uploadedAt: new Date().toISOString()
            };

            const storageKey = section === "top" ? "Top Advertisement" : "Bottom Advertisement";

            localStorage.setItem(storageKey, JSON.stringify(adData));

            alert("Ad uploaded successfully!");
            setTitle('');
            setImage('');
            setSection('top');
            setUploading(false);

        };

        reader.readAsDataURL(image);
    };

    return (
        <div className="p-4 border">
            <h2 className="text-lg font-bold mb-2">Ad Manager</h2>
            <input type="text" placeholder="Ad Title" className="border p-2 mb-2 w-full" value={title}
                   onChange={(e) => setTitle(e.target.value)}/>
            <input type="file" className="border p-2 mb-2 w-full" accept="image/*"
                   onChange={(e) => setImage(e.target.files[0])}/>

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