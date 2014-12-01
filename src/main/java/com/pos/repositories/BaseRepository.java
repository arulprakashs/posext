package com.pos.repositories;

import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;


/**
 * Marker interface for GDL Data Access Objects.
 *
 * @param <T> Target Domain Object
 * @param <ID> Identifier type of the target domain object
 */
@NoRepositoryBean
public interface BaseRepository<T, ID extends Serializable> extends JpaRepository<T, ID> {

    /**
     * Find an entity by the primary key. The Spring Data implementation will throw
     * {@link org.springframework.orm.jpa.JpaObjectRetrievalFailureException} if the entity is not found.
     * NOTE : Even though our implementation attempts to throw JPA EntityNotFoundException,
     * Spring's JpaObjectRetrievalFailureException will be thrown by Spring Data.
     * This is Spring's design and the calling code should be expecting JpaObjectRetrievalFailureException
     * instead of EntityNotFoundException.
     *
     * @param pk primary key.
     * @return found entity or {@link org.springframework.orm.jpa.JpaObjectRetrievalFailureException}
     */
    T findById(ID pk);
}
