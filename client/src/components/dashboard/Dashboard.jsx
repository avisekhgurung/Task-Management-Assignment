import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
//components
import ListTodos from "./todolist/ListTodos";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { startCase } from "lodash"
import AddIcon from '@mui/icons-material/Add';
import ManageTodo from "./todolist/ManageTodo";


const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();

      setAllTodos(parseData);

      setName(parseData[0].user_name); // name is the first array item
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Successfully logged out");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setTodosChange(false);
  }, [todosChange]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" color="inherit">
              Task Management
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Typography variant="h6" color="inherit">
              {startCase(name)}
            </Typography>
            <Button onClick={(e) => logout(e)} variant="outlined" style={{ display: 'flex', justifyContent: 'flex-end' }} color="inherit">Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box mt={5} px={10}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>Add</Button>
        <ManageTodo 
          handleClose={handleClose}
          open={open}
          setTodosChange={setTodosChange}
        />
        <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
      </Box>

    </div>
  );
};

export default Dashboard;
