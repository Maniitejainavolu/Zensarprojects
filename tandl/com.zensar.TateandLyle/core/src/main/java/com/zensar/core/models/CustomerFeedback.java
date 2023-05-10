package com.zensar.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CustomerFeedback {

	@ValueMapValue
	private String customerComment;
	
	@ValueMapValue
	private String label;

	@ValueMapValue
	private String link;

	/**
	 * @return the customerComment
	 */
	public String getCustomerComment() {
		return customerComment;
	}
	
	/**
	 * @return the label
	 */
	public String getLabel() {
		return label;
	}
	
	/**
	 * @return the link
	 */
	public String getLink() {
		return link;
	}

}
