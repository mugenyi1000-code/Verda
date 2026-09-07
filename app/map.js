/* Verda Maps — Leaflet + Esri/ArcGIS Online public basemap tiles.
   Basemap changes with the active colour theme (see styles.css / app.js).
   No API key is required for these standard Esri World basemap tile
   services at normal usage levels; for production/high-traffic deployment,
   add an ArcGIS Developer API key and switch to the ArcGIS Maps SDK. */

const VerdaMap = (() => {
  let map, markersLayer, currentBasemap;

  const ESRI_BASEMAPS = {
    forest:  { name: "World Topographic",  url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}" },
    ocean:   { name: "Ocean Basemap",      url: "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}" },
    amber:   { name: "World Street Map",   url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" },
    slate:   { name: "Dark Gray Canvas",   url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}" }
  };

  function init(containerId, theme) {
    if (typeof L === "undefined") return null;
    if (map) { map.remove(); map = null; }
    map = L.map(containerId, { zoomControl: true }).setView([0.3476, 32.5825], 7); // Kampala, Uganda default
    setBasemap(theme || "forest");
    markersLayer = L.layerGroup().addTo(map);
    return map;
  }

  function setBasemap(theme) {
    if (!map) return;
    if (currentBasemap) map.removeLayer(currentBasemap);
    const bm = ESRI_BASEMAPS[theme] || ESRI_BASEMAPS.forest;
    currentBasemap = L.tileLayer(bm.url, {
      attribution: `Tiles &copy; Esri — ${bm.name} (ArcGIS Online)`,
      maxZoom: 16
    }).addTo(map);
  }

  function setMarkers(sites) {
    if (!map || !markersLayer) return;
    markersLayer.clearLayers();
    sites.forEach(s => {
      if (typeof s.lat !== "number" || typeof s.lng !== "number") return;
      L.marker([s.lat, s.lng]).addTo(markersLayer).bindPopup(
        `<strong>${s.name}</strong><br>${s.industry || ""}<br>${s.site || ""}`
      );
    });
  }

  return { init, setBasemap, setMarkers };
})();
