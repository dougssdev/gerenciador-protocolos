package br.com.vitus.protocol_monitor.model.dto;

import br.com.vitus.protocol_monitor.model.Protocolo;
import br.com.vitus.protocol_monitor.model.StatusDoProtocolo;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.util.Date;

public record ProtocoloResponseDTO(

        Long id,
        String nomePaciente,
        String unidade,
        String fonte,
        StatusDoProtocolo status,
        String reclamacao,
        String resolucao,
        String resolvidoPor,
        String observacao,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
        LocalDate data
) {

    public ProtocoloResponseDTO(Protocolo protocolo) {
        this(protocolo.getId(), protocolo.getNomePaciente(),
                protocolo.getUnidade(), protocolo.getFonte(),
                protocolo.getStatus(), protocolo.getReclamacao(),
                protocolo.getResolucaoDetalhada(), protocolo.getResolvidoPor(),
                protocolo.getObservacao(), protocolo.getData());
    }
}
