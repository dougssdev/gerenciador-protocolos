package br.com.vitus.protocol_monitor.model.dto;

import br.com.vitus.protocol_monitor.model.StatusDoProtocolo;

import java.util.Date;

public record ProtocoloRequestDTO(

        String nomePaciente,
        String unidade,
        String fonte,
        StatusDoProtocolo status,
        String reclamacao,
        String resolucao,
        String resolvidoPor,
        String observacao,
        Date data
){
}
