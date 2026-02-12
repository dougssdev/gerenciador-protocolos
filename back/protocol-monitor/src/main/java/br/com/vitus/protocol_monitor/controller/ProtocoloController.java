package br.com.vitus.protocol_monitor.controller;

import br.com.vitus.protocol_monitor.model.dto.ProtocoloRequestDTO;
import br.com.vitus.protocol_monitor.model.dto.ProtocoloResponseDTO;
import br.com.vitus.protocol_monitor.service.ProtocoloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/protocolos")
public class ProtocoloController {


    @Autowired
    private ProtocoloService service;

    @PostMapping("/cadastrar")
    public ResponseEntity<ProtocoloResponseDTO> cadastrar(@RequestBody ProtocoloRequestDTO data){
        ProtocoloResponseDTO response = service.cadastrar(data);
        return ResponseEntity.ok(response);
    }

}
