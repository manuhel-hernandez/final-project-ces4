import { Button, Grid, Typography } from "@mui/material";
import ParkingForm from "../../components/ParkingForm/ParkingForm";
import ParkingLot from "../../components/ParkingLot/ParkingLot";
import VehicleForm from "../../components/VehicleForm/VehicleForm";
import { useUser } from "../../context/UserContext/UserContext";
import style from "../../pages/DashboardPage/DashboardPage.module.css";

function DashboardPage() {
  const { logout } = useUser();

  const handleCerrarSesion = () => {
    logout();
  };
  return (
  <Grid>
    <Grid container direction="row" padding={1} spacing={2}>
      <Grid item xs={12} sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", padding: 2 }}>
        <Typography variant="h4" textAlign="center" component="div" sx={{ marginTop: "10px", color: "darkcyan" }}>
          Parqueadero Juanita
        </Typography>
        <Button  variant="text" onClick={handleCerrarSesion} sx={{ textTransform: "none" , position: "absolute", right: "10px", color: "darkcyan" }}>
          Cerrar sesión
        </Button>
      </Grid>
    </Grid> 
    
    <Grid section className={style.appwrapperCabeza} >
      <Grid div >
        <Grid section className={style.appwrapper}>
            <ParkingForm />
        </Grid>
      </Grid >
        <Grid section className={style.appwrapper} >
          <VehicleForm />
        </Grid >   
    </Grid >

    <Grid div className={style.prueba}>
          <ParkingLot />
    </Grid>
  </Grid> 
  );
}

export default DashboardPage;
