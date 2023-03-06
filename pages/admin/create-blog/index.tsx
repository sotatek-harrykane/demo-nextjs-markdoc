import React, { useState } from "react";
import dynamic from "next/dynamic";
import matter from "gray-matter";
import moment from "moment";

const mkdStr = `---

title: Your Title

description: Your Description

socialImage: Your Link Image

date: ${moment().format("MMM Do YY")}

category: Your Category

---

`;

const MDEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.default), { ssr: false });

const Test = () => {
    const [value, setValue] = useState(mkdStr);
    function handleWriteFile() {
        const postData = async () => {
            const response = await fetch("/api/create-blog", {
                method: "POST",
                body: value,
            });
            return response.json();
        };
        postData().then((data) => {
            alert(data.message);
        });
    }
    return (
        <div className="container">
            <button type="button" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => handleWriteFile()}>Publish</button>
            <div data-color-mode="light">
                <MDEditor height={800} value={value} onChange={(value: any) => setValue(value)} />
            </div>
        </div>
    );
};

export default Test;
