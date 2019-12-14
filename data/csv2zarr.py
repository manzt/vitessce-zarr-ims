from pathlib import Path
import json
import pandas as pd
import numpy as np
import zarr

DATA_PATH = Path("..") / ".." / "vanderbilt" / "columnar"


def df2tensor(df):
    # set x y as row and column indicies
    multi_index = df.pivot(index="y", columns="x").fillna(0)

    # save names of channels
    mz_list = multi_index.columns.levels[0].values

    # reshape to ndarray
    array = multi_index.values.reshape(
        (len(multi_index), -1, len(mz_list)), order="F"
    ).transpose()

    y_coords = df.y.sort_values().unique().astype("uint32")
    x_coords = df.x.sort_values().unique().astype("uint32")

    return array, mz_list, y_coords, x_coords


if __name__ == "__main__":
    file = list(DATA_PATH.glob("*.csv"))[0]
    df = pd.read_csv(file)
    arr, mz_list, y_coords, x_coords = df2tensor(df)

    z = zarr.open("VAN.zarr", shape=arr.shape, compressor=None, dtype="i4")
    z[:, :, :] = arr

    with open("VAN_meta.json", "w") as outfile:
        meta = {"x": x_coords.tolist(), "y": y_coords.tolist(), "mz": mz_list.tolist()}
        json.dump(meta, outfile)
