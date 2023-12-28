import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { Form } from 'react-router-dom';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import { DataGrid } from '@mui/x-data-grid'


function OrderList() {

  const [open, setOpen] = React.useState(false);
  const [deldialogeopen, setdeldialoOpen] = React.useState(false);
  const [isLoading, setLoading] = useState(false)
  const [order, setorderlist] = useState([]);
  const [user, setUser] = useState({
    category: "",
    Stock: "",
    Discount: "",
    Price: ""
  })

  const handleClickOpen = (params) => {
    setOpen(true);

  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenedit = (row) => {
    setOpen(true);
  };


  const handleChange = (e) => {
    setUser((prevState) => ({ ...user, [e.target.name]: e.target.value }))
  };

  const handleClickOpendel = (row) => {
    setdeldialoOpen(true);
  };

  const handleClosedel = () => {
    setdeldialoOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'first_name', headerName: 'First name', width: 200 },
    { field: 'last_name', headerName: 'Last name', width: 200 },
    {
      field: 'email',
      headerName: 'Email',
      width: 350,
    },
    {
      field: 'avatar',
      headerName: 'Avtar',
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Image"
          style={{ width: '60px', height: '60px' }}
        />
      ),

    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 150,
      renderCell: (params) => (

        <>
          <IconButton aria-label='add' onClick={() => handleClickOpen(params)}>
            <AddIcon />
          </IconButton>

          <IconButton aria-label='edit' onClick={() => handleClickOpenedit(params)}>
            <EditIcon />
          </IconButton>

          <IconButton aria-label="delete" onClick={() => handleClickOpendel(params)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const url = ' https://reqres.in/api/users?page=2';
  useEffect(() => {
    getorderlist();
  }, []);

  //get request api call

  const getorderlist = () => {
    axios.get(url)
      .then((response) => {
        setLoading(true)
        setorderlist(response.data.data);
        setLoading(false)
      })
      .catch(error => console.log('api fail data load'));
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    setOpen(false);

    axios.post(url, { user })
      .then(function (response) {
      
        alert('Add Succesfully !')
      })
      .catch(function (error) {
        alert('Add Order Fail !')

      });
  };


  const handleSubmitedit = (e) => {
    e.preventDefault();

    setOpen(false);

    axios.put(url, { user })
      .then(function (response) {

        alert('Update Data Succesfully !')
      })
      .catch(function (error) {
        alert('Update Data Fail !')

      });
  };

  const deletedata = (e) => {
    e.preventDefault();

    setdeldialoOpen(false);

    axios.delete(url, { user })
      .then(function (response) {

        alert('Delete data Succesfully !')
      })

      .catch(function (error) {
        alert('Delete data fail')

      });
  }

  return (
    <>
      {isLoading && <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>}

      <div style={{ marginTop: '4rem' }}>
        <DataGrid
          rows={order}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 25, 50]}
          checkboxSelection
        />
      </div>

      {/* add dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>  Add Order</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <DialogContentText>
              Please Enter your Order Details
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              name="Firstname"
              label="Firstname"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              name="Last Name"
              label="Last Name"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              name="email"
              label="email"
              type="email"
              fullWidth
              variant="outlined"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              name="Avtar"
              label="Avtar"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) => handleChange(e)}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* edit dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>  Edit Order</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmitedit}>
            <DialogContentText>
              Please Enter your Order Details
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="Firstname"
              label="Firstname"
              type="Firstname"
              fullWidth
              variant="outlined"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="Last Name"
              label="Last Name"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="email"
              type="email"
              fullWidth
              variant="outlined"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="avtar"
              label="avtar"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e) => handleChange(e)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmitedit}>Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* delete dialog */}
      <Dialog open={deldialogeopen} onClose={handleClosedel} >
        <DialogTitle>  Delete Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are your want to sure delete Order
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosedel}>Cancel</Button>
          <Button onClick={deletedata}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>

  )
}
export default OrderList


