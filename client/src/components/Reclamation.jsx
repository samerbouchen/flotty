import { Box, Button, TextField, TextareaAutosize, } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getReclamations, reclamation } from 'Api/api';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserID from 'service/getUserID';
import getUserRole from 'service/getUserRole';
import Header from './Header';
import { useTheme } from '@emotion/react';



const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "user",
      headerName: "user email",
      flex: 0.5,
    },
    {
      field: "reclamation",
      headerName: "reclamation",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "date de creaction",
      flex: 0.5,
    },
  ];

const Reclamation = ({ token }) => {

    const navigate = useNavigate();
    const [reclamations , setReclamations] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        (async ()=> {
           await getReclamations().then(res => {{
               setReclamations(res.data)
           }})
        })()
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("hello ")
        const rec = event.target.elements.reclamation.value ?? "";
        const user = getUserID(token)
        await reclamation(rec, user);

        navigate("/dashboard");
    }

    return (
        <Box>
            {getUserRole(token) === "admin" ?
                <Box m="1.5rem 2.5rem">
                    <Box
                        mt="40px"
                        height="75vh"
                        sx={{
                            "& .MuiDataGrid-root": {
                                border: "none",
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none",
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: theme.palette.background.alt,
                                color: theme.palette.secondary[100],
                                borderBottom: "none",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: theme.palette.primary.light,
                            },
                            "& .MuiDataGrid-footerContainer": {
                                backgroundColor: theme.palette.background.alt,
                                color: theme.palette.secondary[100],
                                borderTop: "none",
                            },
                            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                color: `${theme.palette.secondary[200]} !important`,
                            },
                        }}
                    >
                        <DataGrid
                            loading={false}
                            getRowId={(row) => row.id}
                            rows={reclamations}
                            columns={columns}
                        />
                    </Box>
                </Box>
                :
                <form onSubmit={handleSubmit}>
                    <TextareaAutosize id="reclamation" minRows={25} style={{ minWidth: "90%", display: "block", margin: "auto" }} placeholder='Reclamation ......' />
                    <Button type='submit' variant="contained" sx={{ display: "block", margin: "2rem auto auto auto", padding: "10px 30px 10px 30px" }} color='success' > Ajouter </Button>
                </form>
            }

        </Box>

    )
}

export default Reclamation