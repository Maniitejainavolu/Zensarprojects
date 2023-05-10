package com.zensar.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SocialMedia {
	
	@ValueMapValue
	private String fileReference;

	@ValueMapValue
	private String link;
	
	@ValueMapValue
	private String alt;
	
	/**
	 * @return the fileReference
	 */
	public String getFileReference() {
		return fileReference;
	}
	
	/**
	 * @return the link
	 */
	public String getLink() {
		return link;
	}

	/**
	 * @return the alt
	 */
	public String getAlt() {
		return alt;
	}
}
