const LocationR = ({ name, latitude, longitude }) => {
  return (
    <div className="location-result">
      <h4 longitude={longitude} latitude={latitude}>
        {name}
      </h4>
    </div>
  );
};

export default LocationR;
