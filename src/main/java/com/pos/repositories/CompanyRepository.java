package com.pos.repositories;

import com.pos.domain.Company;

public interface CompanyRepository extends BaseRepository <Company, Long> {
    
    /**
     * Find by id.
     * @param productId
     *            the product id
     * @return the product
     */
	Company findById(long id);
    
	Company findByName(String name);
}
