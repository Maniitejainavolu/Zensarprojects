package com.zensar.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HeroCarouselItem {
	
	@ValueMapValue
	private String title;

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
	 * @return the title
	 */
	public String getTitle() {
		return title;
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
