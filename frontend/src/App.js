import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from '@mui/material';
import ListOverview from './components/ListOverview';
import ShoppingListEditor from './components/ShoppingListEditor';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Lista de Compras
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<ListOverview />} />
            <Route path="/listas/:id" element={<ShoppingListEditor />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Container>
    </BrowserRouter>
  );
}

export default App;
