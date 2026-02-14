package br.com.vitus.protocol_monitor.repository;

import br.com.vitus.protocol_monitor.model.Protocolo;
import br.com.vitus.protocol_monitor.model.dto.ProtocoloResponseDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProtocoloRepository extends JpaRepository<Protocolo, Long> {

    @Query("""
        SELECT p FROM Protocolo p
""")
    Page<Protocolo> findAllProtocolo(Pageable pageable);

    Protocolo findProtocoloById(Long id);
}
