package br.com.vitus.protocol_monitor.repository;

import br.com.vitus.protocol_monitor.model.Protocolo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProtocoloRepository extends JpaRepository<Protocolo, Long> {
}
