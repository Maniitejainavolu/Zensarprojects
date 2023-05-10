package com.zensar.core.models;

import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BlocNavigationItem {
	
	@ValueMapValue
	private String label;

	@ChildResource
	private List<SubNavigation> blocSubNavList;

	/**
	 * Returns the list of blocSubNavList as authored in the component dialog.
	 * 
	 * @return list of blocSubNavList.
	 */
	public List<SubNavigation> getBlocSubNavList() {
		return blocSubNavList;
	}
	
	/**
	 * @return the label
	 */
	public String getLabel() {
		return label;
	}
	
}
