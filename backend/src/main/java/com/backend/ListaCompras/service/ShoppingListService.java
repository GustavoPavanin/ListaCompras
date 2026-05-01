package com.backend.ListaCompras.service;

import com.backend.ListaCompras.dto.ItemDTO;
import com.backend.ListaCompras.dto.ShoppingListDTO;
import com.backend.ListaCompras.dto.ShoppingListSummaryDTO;
import com.backend.ListaCompras.entity.Item;
import com.backend.ListaCompras.entity.ShoppingList;
import com.backend.ListaCompras.repository.ItemRepository;
import com.backend.ListaCompras.repository.ShoppingListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShoppingListService {

    public static final String LISTA_NAO_ENCONTRADA = "Lista não encontrada: ";
    private final ShoppingListRepository shoppingListRepository;
    private final ItemRepository itemRepository;

    @Transactional(readOnly = true)
    public List<ShoppingListSummaryDTO> findAll() {
        return shoppingListRepository.findAll().stream()
                .map(this::toSummaryDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ShoppingListDTO findById(Long id) {
        ShoppingList list = shoppingListRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(LISTA_NAO_ENCONTRADA + id));
        return toDTO(list);
    }

    @Transactional
    public ShoppingListDTO create() {
        ShoppingList list = new ShoppingList();
        LocalDate date = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        list.setNome("Lista do dia " + date.format(formatter));
        ShoppingList saved = shoppingListRepository.save(list);
        return toDTO(saved);
    }

    @Transactional
    public ShoppingListDTO update(Long id, ShoppingListDTO dto) {
        ShoppingList list = shoppingListRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(LISTA_NAO_ENCONTRADA + id));

        list.setNome(dto.getNome());
        list.getItens().clear();

        if (dto.getItens() != null) {
            for (ItemDTO itemDTO : dto.getItens()) {
                Item item = new Item();
                item.setTexto(itemDTO.getTexto());
                item.setAtendido(itemDTO.getAtendido() != null ? itemDTO.getAtendido() : false);
                item.setShoppingList(list);
                item.setQuantidade(itemDTO.getQuantidade());
                list.getItens().add(item);
            }
        }

        ShoppingList updated = shoppingListRepository.save(list);
        return toDTO(updated);
    }

    @Transactional
    public void delete(Long id) {
        if (!shoppingListRepository.existsById(id)) {
            throw new RuntimeException(LISTA_NAO_ENCONTRADA + id);
        }
        shoppingListRepository.deleteById(id);
    }

    private ShoppingListSummaryDTO toSummaryDTO(ShoppingList list) {
        return new ShoppingListSummaryDTO(
                list.getId(),
                list.getNome(),
                list.getItens().size()
        );
    }

    private ShoppingListDTO toDTO(ShoppingList list) {
        List<ItemDTO> itemDTOs = list.getItens().stream()
                .map(item -> new ItemDTO(item.getId(), item.getTexto(), item.getAtendido(), item.getQuantidade()))
                .collect(Collectors.toList());

        return new ShoppingListDTO(list.getId(), list.getNome(), itemDTOs);
    }
}
