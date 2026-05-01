package com.backend.ListaCompras.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingListSummaryDTO {
    private Long id;
    private String nome;
    private int quantidadeItens;
}
