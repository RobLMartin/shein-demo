import useMap from "./useMap";

export default function MapboxGL({ lat, long }: { lat: number; long: number }) {
  const mapContainer = useMap(lat, long);

  return (
    <div className="h-full relative">
      <div ref={mapContainer} className="h-full" />
    </div>
  );
}
