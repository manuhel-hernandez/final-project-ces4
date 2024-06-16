import { Button, Card, CardContent, FormControl, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useUser } from "../../context/UserContext/UserContext";

function Login() {
  const { login } = useUser();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(userName, password);
  };

  return (
    <Grid container justifyContent="center" alignContent="center" sx={{ minHeight: "50vh" }}>
      <Card sx={{ width: 450, height: "auto", boxShadow: "none" }}>
        <CardContent sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
          <Typography variant="h4" textAlign="center" component="div" sx={{ color: "darkcyan" }}>
            Iniciar sesión
          </Typography>
          <FormControl fullWidth>
            <TextField variant="standard" label="Usuario" type="text" id="userName" value={userName} 
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField variant="standard" label="Contraseña" type="password" id="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button 
            sx={{ mt: 2, textTransform: "none", background: "darkcyan", color: "white", 
              '&:hover': {background: 'rgb(72, 179, 179)'} 
            }} variant="text" onClick={handleLogin}
          >
            Aceptar
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Login;
