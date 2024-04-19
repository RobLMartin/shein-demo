import useMap from "./useMap";

export default function MapboxGL() {
  const mapContainer = useMap();

  return (
    <div className="h-full relative">
      <div ref={mapContainer} className="h-full" />
    </div>
  );
}
