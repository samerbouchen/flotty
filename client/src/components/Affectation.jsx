import { Box, Button, TextField, TextareaAutosize, } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getAffectations } from 'Api/api';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';



const columns = [
    {
        field: "num",
        headerName: "num",
        flex: 1,
    },
    {
        field: "nom",
        headerName: "nom",
        flex: 0.5,
    },
    {
        field: " unite_de_base",
        headerName: " unite_de_base",
        flex: 0.5,
    },
    {
        field: "charge_daffaire",
        headerName: "charge_daffaire",
        flex: 0.5,
    },
    {
        field: "region",
        headerName: "region",
        flex: 0.5,
    }
];

const Affectation = () => {

    const navigate = useNavigate();
    const [reclamations, setReclamations] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        (async () => {
            await getAffectations().then(res => {
                {
                    setReclamations(res.data)
                }
            })
        })()
    }, []);


    return (
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

    )
}

export default Affectation