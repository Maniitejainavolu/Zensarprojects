package com.zensar.core.models;

import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TechnicalExpertiseModel {

	@ValueMapValue
	private String title;
	
	@ValueMapValue
	private String label;

	@ValueMapValue
	private String link;

	@ValueMapValue
	private String fileReference;

	@ChildResource
	private List<TechnicalExpertise> expertiseList;

	/**
	 * Returns the list of expertiseList as authored in the component dialog.
	 * 
	 * @return list of expertiseList.
	 */
	public List<TechnicalExpertise> getExpertiseList() {
		return expertiseList;
	}

	/**
	 * Returns the title authored in the dialog.
	 * 
	 * @return the title
	 */
	public String getTitle() {
		return title;
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
	
	/**
	 * @return the fileReference
	 */
	public String getFileReference() {
		return fileReference;
	}

}
