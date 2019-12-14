import React, { useState, useEffect } from "react";
import { openArray } from "zarr";
import Heatmap from "./components/Heatmap";

const config = {
  store: "http://localhost:3000/", // proxy on localhost:8000
  path: "VAN.zarr",
  mode: "r"
};

function App() {
  const [imsData, setImsData] = useState(0);
  const [data2d, setData2d] = useState(0);

  async function getSlice(arr, x, y, z) {
    const slice = await arr.get([x, y, z]);
    return slice;
  }

  useEffect(() => {
    async function bindArray() {
      const z = await openArray(config);
      const meta = await fetch("VAN_meta.json").then(res => res.json());
      const data = { arr: z, meta: meta };
      const dataSlice = await getSlice(z, 0, null, null);
      setImsData(data);
      setData2d(dataSlice.data);
    }
    bindArray();
  }, []);

  return (
    <div className="App">
      {imsData !== 0 && data2d !== 0 ? (
        <Heatmap data2d={data2d} meta={imsData.meta} />
      ) : null}
    </div>
  );
}

export default App;
