import React from "react";
import {
  DeckGL,
  HeatmapLayer,
  OrthographicView,
  COORDINATE_SYSTEM
} from "deck.gl";

const INITIAL_VIEW_STATE = { target: [0, 0, 0], zoom: -5 };

const Heatmap = ({ data }) => {
  /**
   * Data format:
   * [
   *   {COORDINATES: [-122.42177834, 37.78346622], WEIGHT: 10},
   *   ...
   * ]
   */
  const layer = new HeatmapLayer({
    data: data,
    id: "heatmapLayer",
    getPosition: d => d.COORDINATES,
    getWeight: d => d.WEIGHT,
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
