package br.com.vitus.protocol_monitor.service;

import br.com.vitus.protocol_monitor.SemProtocolosException;
import br.com.vitus.protocol_monitor.model.Protocolo;
import br.com.vitus.protocol_monitor.model.StatusDoProtocolo;
import br.com.vitus.protocol_monitor.model.dto.ProtocoloRequestDTO;
import br.com.vitus.protocol_monitor.model.dto.ProtocoloResponseDTO;
import br.com.vitus.protocol_monitor.model.dto.ProtocoloUpdateDTO;
import br.com.vitus.protocol_monitor.repository.ProtocoloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProtocoloService {

    @Autowired
    ProtocoloRepository repository;

    public ProtocoloResponseDTO cadastrar(ProtocoloRequestDTO data) {
            Protocolo protocolo = new Protocolo(data);
            repository.save(protocolo);
            return new ProtocoloResponseDTO(protocolo);
    }

    public Page<ProtocoloResponseDTO> listaTodos(Pageable pageable) {
        Page<ProtocoloResponseDTO> map = repository.findAllProtocolo(pageable).map(ProtocoloResponseDTO::new);

        if(map.isEmpty()) {
            throw new SemProtocolosException("Não há protocolo cadastrado.");
        }
        return map;

    }

    public ProtocoloResponseDTO atualizar(ProtocoloUpdateDTO data, Long id) {
        Protocolo protocolo = repository.findProtocoloById(id);
        protocolo.atualizar(data);

        repository.save(protocolo);

        return new ProtocoloResponseDTO(protocolo);
    }

    public ProtocoloResponseDTO buscaProtocolo(Long id) {
        Protocolo protocolo = repository.findProtocoloById(id);
        ProtocoloResponseDTO data = new ProtocoloResponseDTO(protocolo);

        return data;
    }

    public ProtocoloResponseDTO atualizaStatusPendente(Long id) {
        Protocolo protocolo = repository.findProtocoloById(id);

        protocolo.setStatus(StatusDoProtocolo.PENDENTE);

        repository.save(protocolo);
        ProtocoloResponseDTO data = new ProtocoloResponseDTO(protocolo);
        return data;
    }

    public ProtocoloResponseDTO atualizaStatusResolvido(Long id) {
        Protocolo protocolo = repository.findProtocoloById(id);

        protocolo.setStatus(StatusDoProtocolo.RESOLVIDO);

        repository.save(protocolo);
        ProtocoloResponseDTO data = new ProtocoloResponseDTO(protocolo);
        return data;
    }

    public ProtocoloResponseDTO atualizaStatusEmAndamento(Long id) {
        Protocolo protocolo = repository.findProtocoloById(id);

        protocolo.setStatus(StatusDoProtocolo.EM_ANDAMENTO);

        repository.save(protocolo);
        ProtocoloResponseDTO data = new ProtocoloResponseDTO(protocolo);
        return data;
    }

    public ProtocoloResponseDTO atualizaStatusSuspenso(Long id) {
        Protocolo protocolo = repository.findProtocoloById(id);

        protocolo.setStatus(StatusDoProtocolo.SUSPENSO);

        repository.save(protocolo);
        ProtocoloResponseDTO data = new ProtocoloResponseDTO(protocolo);
        return data;
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
