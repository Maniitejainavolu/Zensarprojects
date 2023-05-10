package com.zensar.core.models;

import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BlocNavigation {
	
	@ValueMapValue
	private String label;

	@ValueMapValue
	private String link;
	
	@ChildResource
	private List<BlocNavigationItem> blocNavItems;

	/**
	 * Returns the list of blocNavItems as authored in the component dialog.
	 * 
	 * @return list of blocNavItems.
	 */
	public List<BlocNavigationItem> getBlocNavItems() {
		return blocNavItems;
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
