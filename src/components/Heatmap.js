import React from "react";
import {
  DeckGL,
  HeatmapLayer,
  OrthographicView,
  COORDINATE_SYSTEM
} from "deck.gl";
import { cross, range } from "d3-array";

const INITIAL_VIEW_STATE = { target: [1317.0, 901.5, 0], zoom: -2 };

const Heatmap = ({ data2d, meta }) => {
  /**
   * Data format:
   * [
   *   {COORDINATES: [-122.42177834, 37.78346622], WEIGHT: 10},
   *   ...
   * ]
   */
  const indexes = cross(range(meta.x.length), range(meta.y.length));
  console.log(indexes);
  const layer = new HeatmapLayer({
    data: indexes,
    id: "heatmapLayer",
    getPosition: d => [meta.x[d[0]], meta.y[d[1]]],
    getWeight: d => data2d[d[0]][d[1]],
    coordinateSystem: COORDINATE_SYSTEM.IDENTITY
  });

  return (
    <DeckGL
      controller={true}
      initialViewState={INITIAL_VIEW_STATE}
      views={new OrthographicView({ controller: true })}
      layers={[layer]}
    />
  );
};

export default Heatmap;
