package br.com.vitus.protocol_monitor.repository;

import br.com.vitus.protocol_monitor.model.Protocolo;
import br.com.vitus.protocol_monitor.model.StatusDoProtocolo;
import br.com.vitus.protocol_monitor.model.Unidade;
import br.com.vitus.protocol_monitor.model.dto.ProtocoloResponseDTO;

import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProtocoloRepository extends JpaRepository<Protocolo, Long>, JpaSpecificationExecutor<Protocolo> {

    @Query("""
        SELECT p FROM Protocolo p
""")
    Page<Protocolo> findAllProtocolo(Pageable pageable);

    Protocolo findProtocoloById(Long id);

}
