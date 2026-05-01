package com.backend.ListaCompras.controller;

import com.backend.ListaCompras.dto.ShoppingListDTO;
import com.backend.ListaCompras.dto.ShoppingListSummaryDTO;
import com.backend.ListaCompras.service.ShoppingListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shopping-lists")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ShoppingListController {

    private final ShoppingListService shoppingListService;

    @GetMapping
    public ResponseEntity<List<ShoppingListSummaryDTO>> getAll() {
        return ResponseEntity.ok(shoppingListService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShoppingListDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(shoppingListService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ShoppingListDTO> create() {
        return ResponseEntity.status(HttpStatus.CREATED).body(shoppingListService.create());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShoppingListDTO> update(@PathVariable Long id, @RequestBody ShoppingListDTO dto) {
        return ResponseEntity.ok(shoppingListService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        shoppingListService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
