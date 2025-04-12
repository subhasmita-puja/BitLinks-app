"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Shorten = () => {
    const [url, seturl] = useState("")
    const [shorturl, setshorturl] = useState("")
    const [generated, setGenerated] = useState("")

    const generate = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shorturl": shorturl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)
                seturl("")
                setshorturl("")
                console.log(result)
                alert(result.message)

            })
            .catch((error) => console.error(error));
    }


    return (
        <div className="min-h-screen bg-purple-50 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 space-y-6">
            <h1 className="text-3xl font-bold text-purple-700 text-center">🔗 Shorten Your URL</h1>
            
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={url}
                className="w-full px-4 py-3 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your full URL"
                onChange={(e) => seturl(e.target.value)}
              />
              <input
                type="text"
                value={shorturl}
                className="w-full px-4 py-3 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Preferred short link (e.g. mylink)"
                onChange={(e) => setshorturl(e.target.value)}
              />
              <button
                onClick={generate}
                className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-bold py-3 rounded-md shadow-md"
              >
                🚀 Generate Link
              </button>
            </div>
    
            {generated && (
              <div className="mt-6 bg-purple-100 p-4 rounded-lg text-center">
                <p className="font-semibold text-purple-700 mb-1">✅ Your Short URL:</p>
                <code className="text-purple-900 font-mono break-all">
                  <Link target="_blank" href={generated}>{generated}</Link>
                </code>
              </div>
            )}
          </div>
        </div>
      );
    };
    
    export default Shorten;