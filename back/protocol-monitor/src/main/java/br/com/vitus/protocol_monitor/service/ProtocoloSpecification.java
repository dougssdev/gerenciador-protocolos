package br.com.vitus.protocol_monitor.service;

import br.com.vitus.protocol_monitor.model.Protocolo;
import br.com.vitus.protocol_monitor.model.StatusDoProtocolo;
import br.com.vitus.protocol_monitor.model.Unidade;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ProtocoloSpecification {

    public static Specification<Protocolo> filtrar(StatusDoProtocolo status,
                                                   LocalDate data,
                                                   Unidade unidade,
                                                   String nomePaciente,
                                                   String reclamacao,
                                                   String resolucao){

        return ((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (status != null)
                predicates.add(cb.equal(root.get("status"), status));

            if(unidade != null)
                predicates.add(cb.equal(root.get("unidade"), unidade));

            if (nomePaciente != null)
                predicates.add(cb.like(cb.lower(root.get("nomePaciente")),
                        "%" + nomePaciente.toLowerCase() + "%"));

            if (reclamacao != null)
                predicates.add(cb.like(cb.lower(root.get("reclamacao")),
                        "%" + reclamacao.toLowerCase() + "%"));

            if (resolucao != null)
                predicates.add(cb.like(cb.lower(root.get("resolucao")),
                        "%" + resolucao.toLowerCase() + "%"));

            if(data != null)
                predicates.add(cb.lessThanOrEqualTo(root.get("data"), data));

            return cb.and(predicates.toArray(new Predicate[0]));
        });
    }
}
