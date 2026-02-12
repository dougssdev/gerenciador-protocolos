package br.com.vitus.protocol_monitor.model;

import br.com.vitus.protocol_monitor.model.dto.ProtocoloRequestDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Table
@Entity
@NoArgsConstructor
public class Protocolo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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

    private Date data;

    public Protocolo(ProtocoloRequestDTO data) {
        this(data.nomePaciente(), data.unidade(),
                data.fonte(), data.status(),
                data.reclamacao(), data.resolucao(),
                data.resolvidoPor(), data.observacao(),
                data.data());
    }
}
