import { Button, Card, CardContent, FormControl, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useUser } from "../../context/UserContext/UserContext";

function Login() {
  const { userLogin } = useUser();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    userLogin(userName, password);
  };

  return (
    <Grid container justifyContent="center" alignContent="center" sx={{ minHeight: "100vh" }}>
      <Card sx={{ width: 600, height: "auto", boxShadow: "none" }}>
        <CardContent sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
          <Typography variant="h4" textAlign="center" component="div">
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
          <Button variant="text" onClick={handleLogin}>
            Iniciar Sesión
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Login;
