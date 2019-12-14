import React, { useState, useEffect } from "react";
import "./App.css";
import { openArray } from "zarr";

const config = {
  store: "http://localhost:3000/", // proxy on localhost:8000
  path: "VAN.zarr",
  mode: "r"
};

function App() {
  const [imsData, setImsData] = useState([]);

  async function getSlice(x, y, z) {
    const { arr } = imsData;
    const slice = await arr.get([x, y, z]);
    console.log(slice);
  }

  useEffect(() => {
    async function bindArray() {
      const z = await openArray(config);
      const meta = await fetch("VAN_meta.json").then(res => res.json());
      setImsData({ arr: z, meta: meta });
    }
    bindArray();
  }, []);

  return <div className="App">yo</div>;
}

export default App;
