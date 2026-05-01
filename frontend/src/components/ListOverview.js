import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { getShoppingLists, createShoppingList } from '../api/api';

export default function ListOverview() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getShoppingLists();
      setLists(data);
      setLoading(false);
    };

    load();
  }, []);

  const handleCreate = async () => {
    setCreating(true);
    const newList = await createShoppingList();
    setCreating(false);
    navigate(`/listas/${newList.id}`);
  };

  return (
    <Box>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        mb={3}
        gap={2}
      >
        <Typography variant="h4" component="h1">
          Listas de Compras
        </Typography>
        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={creating}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          {creating ? 'Criando...' : 'Criar lista de compras'}
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : lists.length === 0 ? (
        <Typography color="text.secondary">Nenhuma lista encontrada. Crie sua primeira lista.</Typography>
      ) : (
        <Grid container spacing={2}>
          {lists.map((list) => (
            <Grid item xs={12} sm={6} key={list.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {list.nome}
                  </Typography>
                  <Typography color="text.secondary">
                    {list.quantidadeItens} item{list.quantidadeItens === 1 ? '' : 's'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate(`/listas/${list.id}`)}>
                    Editar lista
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
