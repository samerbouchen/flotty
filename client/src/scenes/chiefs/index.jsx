import React, {useEffect, useState} from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch, TextField, useTheme } from "@mui/material";
import {  useGetUsersQuery, useDeleteUserMutation } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import "./index.css";
import {addUser, blockUser, deleteUser, getUsers} from "../../Api/api";
const Chiefs = () => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
      (async ()=> {
         await getUsers().then(res => {{
             setUsers(res.data)
         }})
      })()
  }, []);

  const handleDelete = async (id) => {
      await deleteUser(id).then(res => {
        setUsers(users.filter(v=> v.id !== id))
      })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBlock = async(row) => {
    console.log(row.blocked)

    await blockUser(!row.blocked, row.id)
    
    setUsers(users.map(user => {
      if (user.id === row.id) {
        user.blocked = !row.blocked
      }
      return user
    }));
    // blockUser()
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
    },
    {
      field: "action",
      headerName: "actions",
      flex: 0.5,
      renderCell: ({ row }) => (
        <>
          <Switch  checked={row.blocked}
                  onChange={() => handleBlock(row)}
                  inputProps={{ 'aria-label': 'controlled' }}
                  color="error" />
          <DeleteIcon
            className="iconsDash"
            onClick={() => handleDelete(row.id)}
          />
        </>
      ),
    },
  ];

    const handleSubmit = async(event) => {
        event.preventDefault();
        const email = event.target.elements.email.value ?? "";
        const fullName = event.target.elements.name.value ?? "";
        const password = event.target.elements.password.value ?? "";
        const user = await addUser({email, fullName, password})
        setUsers([...users, user.data])
        handleClose();
    }

  return (
    <Box m="1.5rem 2.5rem">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Header  sx={{ backgroundColor: 'red'}}  title="chargée d'affaire " subtitle="Liste des chargées d'affaire " />   
        <Button variant="contained" onClick={handleClickOpen} sx={{ height: '' }} color="success" > Ajouter chargée d'affaire </Button>
      </Box>
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
          rows={users??[]}
          columns={columns}
        />
      </Box>
      <Dialog open={open} onClose={handleClose} >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="center">
            Chargée d'affaire
          </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Full name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />

        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => {handleClose()}}>Cancel</Button>
          <Button color="success" type="submit" >create</Button>
        </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Chiefs;
