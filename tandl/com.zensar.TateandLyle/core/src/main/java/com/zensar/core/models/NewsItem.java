package com.zensar.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NewsItem {

	@ValueMapValue
	private String fileReference;
	
	@ValueMapValue
	private String label;

	@ValueMapValue
	private String link;

	/**
	 * @return the fileReference
	 */
	public String getFileReference() {
		return fileReference;
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
