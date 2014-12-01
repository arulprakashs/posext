package com.pos.repositories;

import com.pos.domain.User;

public interface UserRepository extends BaseRepository <User, Long> {
    
    /**
     * Find by id.
     * @param productId
     *            the product id
     * @return the product
     */
    User findById(long userId);
    
    User findByUserName(String userName);
}
