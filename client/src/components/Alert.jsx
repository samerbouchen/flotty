import { Box, Button, MenuItem, OutlinedInput, Select, TextField, TextareaAutosize, } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getUsers, addalert, getAlert } from 'Api/api';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserID from 'service/getUserID';
import getUserRole from 'service/getUserRole';

import { useTheme } from '@emotion/react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};





//   function getStyles(name, personName, theme) {
//     return {
//       fontWeight:
//         personName.indexOf(name) === -1
//           ? theme.typography.fontWeightRegular
//           : theme.typography.fontWeightMedium,
//     };
//   }

const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: .1,
    },
    {
      field: "alert",
      headerName: "alert",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "date de creaction",
      flex: 0.5,
    },
  ];

const Alert = ({ token }) => {

    const navigate = useNavigate();
    const [alerts , setAlert] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users ,setUsers] = useState([]);
    const theme = useTheme();

    // const handleChange = (user) => {
    //     console.log(user.value)
    //     const {
    //     target: { value },
    //     } = user;
    //     setSelectedUser(
    //         value
    //         // On autofill we get a stringified val
    //     );
    // };

    useEffect(() => {
        if (getUserRole(token) === "user"){
            (async ()=> {
                console.log("♥") ;         
                await getAlert(getUserID(token))
                .then(res => {
                    setAlert(res.data)
                    console.log("debug 🤣",res.data)
                });
             })()
        }else {
            (async () => {
                await getUsers().then(res => {
                    setUsers(res.data)
                    console.log(" res => ", res.data );
                })
            })()
        } 
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = document.getElementsByClassName("MuiSelect-nativeInput")[0].value;
        const alert = event.target.elements.alert.value ?? "";
        await addalert({id: +user, alert});

        navigate("/dashboard");
    }

    return (
        <Box>
            {getUserRole(token) === "user" ?
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
                            rows={alerts}
                            columns={columns}
                        />
                    </Box>
                </Box>
                :
                <form onSubmit={handleSubmit} style={{paddingInline: '5vw'}}>
                    <TextareaAutosize id="alert" minRows={25} style={{ minWidth: "90%", display: "block", margin: "auto" }} placeholder=' Alert  ......' />
                    <Select
                        displayEmpty
                        input={<OutlinedInput />}
                        itemID='user'
                        style={{maxWidth: "90%", margin: 'auto', display:'block'}}
                        // renderValue={(selected) => {
                        //     if (selected) {
                        //         return <em>User ... </em>;
                        //     }

                        //     return selected;
                        // }}
                        MenuProps={MenuProps}
                        inputProps={{ 'aria-label': 'Without label' }}
                        >
                        <MenuItem disabled value="">
                            <em> User ...  </em>
                        </MenuItem>
                        {users && users.map((v) => (
                            <MenuItem
                             key={v.id}
                             value={v.id}
                            // style={getStyles(name, personName, theme)}
                            >
                            {v.email}
                        </MenuItem>
                        ))}
                    </Select>
                    <Button type='submit' variant="contained" sx={{ display: "block", margin: "2rem auto auto auto", padding: "10px 30px 10px 30px" }} color='success' > Ajouter </Button>
                </form>
            }

        </Box>

    )
}

export default Alert ;
