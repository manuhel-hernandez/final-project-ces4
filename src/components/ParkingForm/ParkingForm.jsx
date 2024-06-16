import { useState, useEffect } from "react";
import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useParking } from "../../context/ParkingContext/ParkingContext";
import { useVehicle } from "../../context/VehicleContext/VehicleContext";

function ParkingForm() {
  const { 
    parkVehicle, getOccupiedSpaces, initializeParkingSpaces, getVehicleByLicensePlate, getParkingSpaces, getVehicleAll
  } = useParking();
  const { getVehicles } = useVehicle();
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedSpace, setSelectedSpace] = useState("");
  const [typeSelected, setTypeSelected] = useState("");
  const [buscar, setBuscar] = useState("");
  const [parkingSpacesList, setParkingSpacesList] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);

  const vehiclesAll = getVehicleAll();
  const vehicles = getVehicles();
  const occupiedSpaces = getOccupiedSpaces();
  const parkingSpaces = getParkingSpaces();

  useEffect(() => {
    const updatedSpacesList = initializeParkingSpaces(5, 10);
    setParkingSpacesList(updatedSpacesList);
  }, [initializeParkingSpaces]);

  const handleVehicleChange = (event) => {
    const value = event.target.value;
    const type = vehicles.find((e) => e.licensePlate == value);
    setTypeSelected(type.type);
    setSelectedVehicle(value);
  };

  const handleSpaceChange = (event) => {
    const selectedSpaceValue = event.target.value;
    if (occupiedSpaces.includes(selectedSpaceValue)) {
      toast.warning("Esta celda está ocupada. Selecciona otra celda.");
    } else {
      setSelectedSpace(selectedSpaceValue);
    }
  };

  const handleBuscar = (event) => {
    const buscado = event.target.value;
    setBuscar(buscado);
    const filteredVehicleOptions = vehicles
      .filter(
        (vehicle) =>
          vehicle.licensePlate.toLowerCase().includes(buscado.toLowerCase()) ||
          vehicle.idDocument.toLowerCase().includes(buscado.toLowerCase())
      )
      .map((vehicle) => ({ plate: vehicle.licensePlate, document: vehicle.idDocument, type: vehicle.type}));
    setSelectedVehicle("");
    setVehicleOptions(filteredVehicleOptions);
    console.log("filteredVehicleOptions", filteredVehicleOptions)
  };

  const handleParkVehicle = () => {
    if (!selectedVehicle || !selectedSpace) {
      toast.warning("Selecciona un vehículo y una celda");
      return;
    }

    const spaceNumber = parseInt(selectedSpace, 10);


    const vehicleInfo = getVehicleByLicensePlate(
      selectedVehicle,
      vehicles,
      spaceNumber
    );

    const validarsiYaExiste = vehiclesAll.map((i) => i.vehicle.licensePlate);

    if (vehicleInfo && validarsiYaExiste.includes(selectedVehicle) != true) {
      parkVehicle(spaceNumber, selectedVehicle, vehicleInfo.type);
      toast.success("Vehículo ingresado en la celda #" + spaceNumber);
      const updatedSpacesList = parkingSpacesList.filter(
        (space) => space !== spaceNumber
      );
      setParkingSpacesList(updatedSpacesList);
      setSelectedVehicle("");
      setSelectedSpace("");
    } else {
      toast.error("¡Este vehículo ya esta ingresado en el parqueadero!");
    }
  };

  return (
    <Grid container justifyContent="center">
      <Card sx={{ width: 400, height: "auto", boxShadow: "none" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="div" mb={2} sx={{ color: "darkcyan" }}>
            Ingresar vehículo
          </Typography>
          <FormControl sx={{ width: "100%", mb: 2 }}>
            <TextField
              variant="standard"
              label="Buscar por placa o documento"
              id="Buscar"
              type="text"
              value={buscar}
              onChange={handleBuscar}
              fullWidth
            />
          </FormControl>
          <Grid container spacing={1} sx={{ width: "100%" }}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="vehicle">Seleccionar vehículo</InputLabel>
                <Select
                  labelId="vehicle"
                  id="vehicle"
                  value={selectedVehicle}
                  onChange={handleVehicleChange}
                  label="Seleccionar un vehículo"
                  fullWidth
                >
                  {vehicleOptions.length === 0 ? (
                    <MenuItem value="" disabled>
                      Primero busca un vehículo
                    </MenuItem>
                  ) : (
                    vehicleOptions.map((vehicle, index) => (
                      <MenuItem key={index} value={vehicle.plate}>
                        {vehicle.type} - {vehicle.document} - {vehicle.plate}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="space">Celda a ocupar</InputLabel>
                <Select
                  id="space"
                  labelId="space"
                  value={selectedSpace}
                  onChange={handleSpaceChange}
                  label="Seleccionar celda"
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Seleccionar celda
                  </MenuItem>
                  {parkingSpaces.map((space, index) => {
                    if (!space.occupied) {
                      if (typeSelected === "moto" && space.type === "moto") {
                        return (
                          <MenuItem key={index} value={space.number}>
                            {`Moto: Celda ${space.number}`}
                          </MenuItem>
                        );
                      } else if (typeSelected === "car" && space.type === "car") {
                        return (
                          <MenuItem key={index} value={space.number}>
                            {`Carro: Celda ${space.number}`}
                          </MenuItem>
                        );
                      }
                    }
                    return null;
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            sx={{ mt: 2, textTransform: "none", background: "darkcyan" }}
            variant="contained"
            onClick={handleParkVehicle}
          >
            Ingresar
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ParkingForm;
