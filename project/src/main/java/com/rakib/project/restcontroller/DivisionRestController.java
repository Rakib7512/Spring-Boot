package com.rakib.project.restcontroller;


import com.rakib.project.dto.DivisionResponseDTO;
import com.rakib.project.entity.Division;
import com.rakib.project.service.DivisionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/division")
public class DivisionRestController {

    @Autowired
    private DivisionService divisionService;

    @GetMapping("")
    public ResponseEntity<List<DivisionResponseDTO>> getDivisions() {
        List<DivisionResponseDTO> dtoList = divisionService.getAllDivisionDTOs();
        return ResponseEntity.ok(dtoList);
    }

    @PostMapping("")
    public ResponseEntity<Division> createDivision(@RequestBody Division division) {
        Division saved = divisionService.saveDivision(division);
        return ResponseEntity.ok(saved);
    }


}
