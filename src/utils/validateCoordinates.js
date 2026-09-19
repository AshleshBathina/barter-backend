
export const validateCoordinates = (lat, lon) => {
  return (
    Number.isFinite(lon) &&
    Number.isFinite(lat) && 
    lat >= -90 && 
    lat <= 90 && 
    lon >= -180 && 
    lon <= 180
  );
}