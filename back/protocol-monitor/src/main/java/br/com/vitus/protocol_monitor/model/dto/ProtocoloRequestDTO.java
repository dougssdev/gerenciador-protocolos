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
        String resolucao,
        String resolucaoDetalhada,
        String resolvidoPor,
        String observacao,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
        LocalDate data
){


}
