"use client";
import { useEffect } from "react";

// ArcGIS JavaScript API
declare global {
  interface Window {
    require: any;
  }
}

const DonatePage = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://js.arcgis.com/4.24/";
      script.async = true;
      script.onload = () => {
        window.require(
          [
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/GeoJSONLayer",
            "esri/PopupTemplate",
            "esri/symbols/SimpleMarkerSymbol",
            "esri/Graphic",
          ],
          (
            Map: any,
            MapView: any,
            GeoJSONLayer: any,
            PopupTemplate: any,
            SimpleMarkerSymbol: any,
            Graphic: any
          ) => {
            const map = new Map({
              basemap: "streets-vector",
            });

            const view = new MapView({
              container: "viewDiv",
              map: map,
              center: [-79.3832, 43.6532],
              zoom: 10,
            });

            const geojsonLayer = new GeoJSONLayer({
              url: "https://www.arcgis.com/sharing/rest/content/items/d71026b4c301492eb73e9fbf9b52ee4c/data",
            });

            const markerSymbol = new SimpleMarkerSymbol({
              color: [255, 0, 0],
              size: 12,
              outline: {
                color: [255, 255, 255],
                width: 2,
              },
            });

            geojsonLayer.renderer = {
              type: "simple",
              symbol: markerSymbol,
            };

            map.add(geojsonLayer);

            const popupTemplate = new PopupTemplate({
              title: "{Name}",
              content: `
                <div class="popup-content border-2">
                  <p><strong>Name:</strong> {Name}</p>
                  <p><strong>Phone Number:</strong> {Phone Number}</p>
                  <p><strong>Website:</strong> <a href="{Website}" target="_blank">{Website}</a></p>
                  <p><strong>Hours of Operation:</strong> {Hours of Operation}</p>
                  <a href="/donate" class="make-donation-button">Make Donation</a>
                </div>
              `,
            });

            geojsonLayer.popupTemplate = popupTemplate;

            // Auto-select and open a random food bank popup
            geojsonLayer.when(() => {
              geojsonLayer.queryFeatures().then((result: any) => {
                if (result.features.length > 0) {
                  const randomFeature =
                    result.features[
                      Math.floor(Math.random() * result.features.length)
                    ];
                  view.popup.open({
                    location: randomFeature.geometry,
                    features: [randomFeature],
                  });
                  view.goTo(randomFeature.geometry); // Optional: Center the view on the feature
                }
              });
            });

            // Handle clicks for popups
            view.on("pointer-click", (event: any) => {
              view.hitTest(event).then((response: any) => {
                const graphic = response.results[0]?.graphic;
                if (graphic) {
                  view.popup.open({
                    location: graphic.geometry,
                    features: [graphic],
                  });
                }
              });
            });
          }
        );
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div>
      <div
        id="viewDiv"
        style={{
          height: "300px",
          width: "100%",
        }}
        className="text-[0px] mt-14"
      ></div>
    </div>
  );
};

export default DonatePage;

