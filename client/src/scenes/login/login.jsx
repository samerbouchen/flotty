import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link, Checkbox, FormControlLabel} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { login } from 'Api/login';
import { useLocation, useNavigate } from 'react-router-dom';
const Login=({ setToken, token })=> {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation()
    const paperStyle={padding :"2rem",height:'70vh',width:"30vw", margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    const handleLogin = (event) => {
        event.preventDefault();
        const username = event.target.elements.username.value ?? "";
        const password = event.target.elements.password.value ?? "";
        login(username, password).then(Response => {
            setError(false);
            setToken(Response.data.token);
            localStorage.setItem("token", Response.data.token)
            navigate("/dashboard");
        })
        .catch(error => {
            console.log(" [debug] ", error.response.data.msg)
            setError(error.response.data.msg)
        });
    }
    useLayoutEffect(()=> {
        if(location.pathname !== "/login"){
            navigate('/login');
        }
    })
    useEffect(()=>{
        console.log("token from login => " , token)
        if(token){
            console.log(token);
            navigate('/dashboard')
        }
    },[token])

    return(
        <Grid sx={{
            padding: "5rem"
        }}>
            <form onSubmit={handleLogin}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlined/></Avatar>
                        <h2>Sign In</h2>
                        {error ? <Typography color={"red"} sx={{marginBottom: "2rem"}}> {error}  </Typography> :null}
                    </Grid>
                    <TextField label='Username' id="username" name="username" placeholder='Enter username' fullWidth required />
                    <TextField label='Password' id="password" name="password" placeholder='Enter password' type='password' fullWidth sx={{marginTop:"1rem"}} required/>
                    <FormControlLabel
                        control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="Remember me"
                    />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                    <Typography >
                        <Link href="#" >
                            Forgot password ?
                    </Link>
                    </Typography>
                    <Typography > Do you have an account ?
                        <Link href="#" >
                            Sign Up 
                    </Link>
                    </Typography>
                </Paper>
            </form>

        </Grid>
    )
}

export default Login;