package br.com.vitus.protocol_monitor.controller;

import br.com.vitus.protocol_monitor.model.dto.ProtocoloRequestDTO;
import br.com.vitus.protocol_monitor.model.dto.ProtocoloResponseDTO;
import br.com.vitus.protocol_monitor.model.dto.ProtocoloUpdateDTO;
import br.com.vitus.protocol_monitor.service.ProtocoloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

    @GetMapping("/listar")
    public ResponseEntity<Page<ProtocoloResponseDTO>> listar(@PageableDefault(size = 10, sort = {"id"}) Pageable pagina){
        Page<ProtocoloResponseDTO> protocoloResponseDTO = service.listaTodos(pagina);
        return ResponseEntity.ok(protocoloResponseDTO);
    }

    @PatchMapping("/atualizar/{id}")
    public ResponseEntity<ProtocoloResponseDTO> atualizar(@RequestBody ProtocoloUpdateDTO data, @PathVariable Long id){
        ProtocoloResponseDTO protocoloResponse = service.atualizar(data, id);
        return ResponseEntity.ok(protocoloResponse);
    }

    @GetMapping("listar/{id}")
    public ResponseEntity<ProtocoloResponseDTO> retornaProtocolo(@PathVariable Long id){
        ProtocoloResponseDTO data = service.buscaProtocolo(id);
        return ResponseEntity.ok(data);
    }

    @PatchMapping("atualizar/status/pendente/{id}")
    public ResponseEntity<ProtocoloResponseDTO> atualizaStatusPendente(@PathVariable Long id){
        ProtocoloResponseDTO data = service.atualizaStatusPendente(id);
        return ResponseEntity.ok(data);
    }

    @PatchMapping("atualizar/status/resolvido/{id}")
    public ResponseEntity<ProtocoloResponseDTO> atualizaStatusResolvido(@PathVariable Long id){
        ProtocoloResponseDTO data = service.atualizaStatusResolvido(id);
        return ResponseEntity.ok(data);
    }

    @PatchMapping("atualizar/status/em_andamento/{id}")
    public ResponseEntity<ProtocoloResponseDTO> atualizaStatusEmAndamento(@PathVariable Long id){
        ProtocoloResponseDTO data = service.atualizaStatusResolvido(id);
        return ResponseEntity.ok(data);
    }

    @PatchMapping("atualizar/status/suspenso/{id}")
    public ResponseEntity<ProtocoloResponseDTO> atualizaStatusSuspento(@PathVariable Long id){
        ProtocoloResponseDTO data = service.atualizaStatusSuspenso(id);
        return ResponseEntity.ok(data);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity deletaProtocolo(@PathVariable Long id){
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
