import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);

  const addVehicle = (vehicle) => {
    const existingDocument = vehicles.find(
 (v) => v.idDocument === vehicle.idDocument
    );

    const existingPlate = vehicles.find(
      (v) => v.licensePlate === vehicle.licensePlate
    );

    if (existingDocument) {
      toast.error("¡El documento ya se encuentra registrado!");
      return;
    } else if (existingPlate) {
      toast.error("¡La placa ya se encuentra registrada!");
      return;
    } else {
      toast.success("¡El vehículo se registró exitosamente!");
      setVehicles((prevVehicles) => [...prevVehicles, vehicle]);
    }
  };

  const getVehicles = () => {
    return vehicles;
  };

  return (
    <VehicleContext.Provider value={{ addVehicle, getVehicles }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicle = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error(
      "useVehicle mal utilizado"
    );
  }
  return context;
};
