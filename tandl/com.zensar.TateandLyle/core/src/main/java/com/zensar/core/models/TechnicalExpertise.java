package com.zensar.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TechnicalExpertise {
	
	@ValueMapValue
	private String caption;

	@ValueMapValue
	private String description;
	
	@ValueMapValue
	private String fileReference;
	
	@ValueMapValue
	private String alt;
	
	@ValueMapValue
	private String label;

	@ValueMapValue
	private String link;
	
	/**
	 * @return the caption
	 */
	public String getCaption() {
		return caption;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}
	
	/**
	 * @return the fileReference
	 */
	public String getFileReference() {
		return fileReference;
	}
	
	/**
	 * @return the alt
	 */
	public String getAlt() {
		return alt;
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
