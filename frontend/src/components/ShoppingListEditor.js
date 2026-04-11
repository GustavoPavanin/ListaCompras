import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SyncIcon from '@mui/icons-material/Sync';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  deleteShoppingList,
  getShoppingListById,
  updateShoppingList,
} from '../api/mockBackend';

export default function ShoppingListEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [list, setList] = useState(null);
  const [newItemText, setNewItemText] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getShoppingListById(id);
      if (!data) {
        setError('Lista não encontrada');
      } else {
        setList(data);
      }
      setLoading(false);
    };

    load();
  }, [id]);

  const itemCountText = useMemo(() => {
    if (!list) return '';
    return `${list.itens.length} item${list.itens.length === 1 ? '' : 's'}`;
  }, [list]);

  const handleAddItem = () => {
    const text = newItemText.trim();
    if (!text || !list) return;
    const nextItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      texto: text,
      atendido: false,
    };
    setList({ ...list, itens: [...list.itens, nextItem] });
    setNewItemText('');
  };

  const handleToggleItem = (itemId) => {
    if (!list) return;
    setList({
      ...list,
      itens: list.itens.map((item) =>
        item.id === itemId ? { ...item, atendido: !item.atendido } : item
      ),
    });
  };

  const handleRemoveItem = (itemId) => {
    if (!list) return;
    setList({
      ...list,
      itens: list.itens.filter((item) => item.id !== itemId),
    });
  };

  const handleSync = async () => {
    if (!list) return;
    setSaving(true);
    await updateShoppingList(id, list);
    setSaving(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Tem certeza que deseja excluir esta lista?');
    if (!confirmed) return;
    setDeleting(true);
    await deleteShoppingList(id);
    setDeleting(false);
    navigate('/');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={6}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate('/')}>Voltar</Button>
      </Box>
    );
  }

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" component="button" onClick={() => navigate('/') }>
          Listas de Compras
        </Link>
        <Typography color="text.primary">Editar lista</Typography>
      </Breadcrumbs>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', md: 'flex-start' }}
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography variant="h4">{list.nome}</Typography>
          <Typography color="text.secondary">{itemCountText}</Typography>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} width={{ xs: '100%', sm: 'auto' }}>
          <Button
            variant="contained"
            startIcon={<SyncIcon />}
            onClick={handleSync}
            disabled={saving}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            {saving ? 'Sincronizando...' : 'Sincronizar'}
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteForeverIcon />}
            onClick={handleDelete}
            disabled={deleting}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            {deleting ? 'Excluindo...' : 'Excluir lista'}
          </Button>
        </Stack>
      </Stack>

      <Box mb={3}>
        <TextField
          value={newItemText}
          onChange={(event) => setNewItemText(event.target.value)}
          label="Adicionar item"
          fullWidth
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleAddItem();
            }
          }}
        />
        <Button
          sx={{ mt: 2, width: { xs: '100%', sm: 'auto' } }}
          variant="contained"
          onClick={handleAddItem}
          disabled={!newItemText.trim()}
        >
          Adicionar item
        </Button>
      </Box>

      <Divider />

      <List>
        {list.itens.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            secondaryAction={
              <IconButton edge="end" aria-label="remover" onClick={() => handleRemoveItem(item.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton onClick={() => handleToggleItem(item.id)}>
              <ListItemIcon>
                <Checkbox edge="start" checked={item.atendido} tabIndex={-1} disableRipple />
              </ListItemIcon>
              <ListItemText
                primary={item.texto}
                sx={{
                  textDecoration: item.atendido ? 'line-through' : 'none',
                  color: item.atendido ? theme.palette.text.disabled : theme.palette.text.primary,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        {list.itens.length === 0 && (
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Nenhum item adicionado ainda. Use o campo acima para começar a montar sua lista.
          </Typography>
        )}
      </List>
    </Box>
  );
}
