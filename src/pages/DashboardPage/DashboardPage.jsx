import { Button, Grid, Typography } from "@mui/material";
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
      <Grid item xs={12} sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", padding: 2 }}>
        <Typography variant="h4" textAlign="center" component="div">
          Home Parqueadero Juanita
        </Typography>
        <Button sx={{ textTransform: "none" }} variant="text" onClick={handleCerrarSesion}>
          Cerrar sesión
        </Button>
      </Grid>
    </Grid> 
  </Grid> 
  );
}

export default DashboardPage;
