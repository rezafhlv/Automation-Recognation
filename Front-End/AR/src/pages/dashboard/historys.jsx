import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Title from "./component/title";
import CustomAppBar from "./component/appbar";
import CustomDrawer from "./component/drawer";

function Copyright(props) {
  return (
    <Typography variant="body2" color="textSecondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit">Automation Recognation</Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Historys() {
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Data dummy
  const subData = [
    {
      _id: "1",
      name: "Item 1",
      status: "Available",
      serialNumber: "SN123456",
    },
    {
      _id: "2",
      name: "Item 2",
      status: "Unavailable",
      serialNumber: "SN789012",
    },
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <CustomAppBar open={open} toggleDrawer={toggleDrawer} />;
        <CustomDrawer open={open} toggleDrawer={toggleDrawer} />;
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Title>Historys Data</Title>
            <Grid container spacing={3}>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <TableContainer
                    style={{ height: 490, width: "100%" }}
                    component={Paper}
                  >
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell className="fw-bold text-center">
                            No
                          </TableCell>
                          <TableCell className="fw-bold text-center">
                            Name User
                          </TableCell>
                          <TableCell className="fw-bold text-center">
                            Audio
                          </TableCell>
                          <TableCell className="fw-bold text-center">
                            Recognized Text
                          </TableCell>
                          <TableCell className="fw-bold text-center">
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {subData
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => (
                            <TableRow key={row._id}>
                              <TableCell className="text-center">
                                {index + 1}
                              </TableCell>
                              <TableCell className="text-center">
                                {row.name}
                              </TableCell>
                              <TableCell className="text-center">
                                {row.status}
                              </TableCell>
                              <TableCell className="text-center">
                                {row.serialNumber}
                              </TableCell>
                              <TableCell className="text-center">
                                <IconButton
                                  size="small"
                                  variant="outlined"
                                  className="me-2"
                                  color="warning"
                                  onClick={() => console.log("Edit", row)}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  variant="outlined"
                                  color="error"
                                  onClick={() => console.log("Delete", row)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={subData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
