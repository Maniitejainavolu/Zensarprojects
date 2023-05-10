package com.zensar.core.models;

import java.util.List;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)

public class ResearchModel {

	@ValueMapValue
	private String title;

	@ChildResource
	private List<Research> researchList;

	
	public List<Research> getResearchList() {
		return researchList;
	}

	/**
	 * Returns the title authored in the dialog.
	 * 
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}
	
}
