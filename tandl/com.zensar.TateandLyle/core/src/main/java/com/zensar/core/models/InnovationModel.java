package com.zensar.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)

public class InnovationModel {
	
	@ValueMapValue
	private String title;
	
	@ValueMapValue
	private String description;
	
	@ValueMapValue
	private String fileReference;

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	public String getFileReference() {
		return fileReference;
	}

	
	
	
	

}
