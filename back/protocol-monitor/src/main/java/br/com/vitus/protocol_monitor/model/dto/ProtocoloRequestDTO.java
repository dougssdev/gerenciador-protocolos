package br.com.vitus.protocol_monitor.model.dto;

import br.com.vitus.protocol_monitor.model.StatusDoProtocolo;
import br.com.vitus.protocol_monitor.model.Unidade;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.util.Date;

public record ProtocoloRequestDTO(

        String nomePaciente,
        Unidade unidade,
        String fonte,
        StatusDoProtocolo status,
        String reclamacao,
        String resolucaoDetalhada,
        String resolvidoPor,
        String observacao,
        LocalDate data
){


}
