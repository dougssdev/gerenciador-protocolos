package br.com.vitus.protocol_monitor.service;

import br.com.vitus.protocol_monitor.model.Protocolo;
import br.com.vitus.protocol_monitor.model.dto.ProtocoloRequestDTO;
import br.com.vitus.protocol_monitor.model.dto.ProtocoloResponseDTO;
import org.springframework.stereotype.Service;

@Service
public class ProtocoloService {

    public ProtocoloResponseDTO cadastrar(ProtocoloRequestDTO data) {
            Protocolo protocolo = new Protocolo(data);
    }
}
