package com.backend.ListaCompras.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingListDTO {
    private Long id;
    private String nome;
    private List<ItemDTO> itens = new ArrayList<>();
}
