package br.com.vitus.protocol_monitor.model;

import br.com.vitus.protocol_monitor.model.dto.ProtocoloRequestDTO;
import br.com.vitus.protocol_monitor.model.dto.ProtocoloUpdateDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

@Getter
@Setter
@Table
@Entity
@NoArgsConstructor
public class Protocolo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomePaciente;
    private String unidade;
    private String fonte;

    @Enumerated(EnumType.STRING)
    private StatusDoProtocolo status;

    private String reclamacao;
    private String resolucaoDetalhada;
    private String resolvidoPor;
    private String observacao;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate data;

    public Protocolo(ProtocoloRequestDTO data) {
       this.nomePaciente = data.nomePaciente();
       this.unidade = data.unidade();
       this.fonte = data.fonte();
       this.status = data.status();
       this.reclamacao = data.reclamacao();
       this.resolucaoDetalhada = data.resolucaoDetalhada();
       this.resolvidoPor = data.resolvidoPor();
       this.observacao = data.observacao();
       this.data = data.data();
    }

    public void atualizar(ProtocoloUpdateDTO dto) {

        Optional.ofNullable(dto.nomePaciente())
                .ifPresent(valor -> this.nomePaciente = valor);

        Optional.ofNullable(dto.unidade())
                .ifPresent(valor -> this.unidade = valor);

        Optional.ofNullable(dto.fonte())
                .ifPresent(valor -> this.fonte = valor);

        Optional.ofNullable(dto.status())
                .ifPresent(valor -> this.status = valor);

        Optional.ofNullable(dto.reclamacao())
                .ifPresent(valor -> this.reclamacao = valor);

        Optional.ofNullable(dto.resolucaoDetalhada())
                .ifPresent(valor -> this.resolucaoDetalhada = valor);

        Optional.ofNullable(dto.resolvidoPor())
                .ifPresent(valor -> this.resolvidoPor = valor);

        Optional.ofNullable(dto.observacao())
                .ifPresent(valor -> this.observacao = valor);

        Optional.ofNullable(dto.data())
                .ifPresent(valor -> this.data = valor);
    }

}
