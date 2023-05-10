package com.zensar.core.models;

import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FooterNavigation {
	
	@ValueMapValue
	private String subNavId;
	
	@ChildResource
	private List<FooterSubNavigation> footerSubNavList;

	/**
	 * Returns the list of footerSubNavList as authored in the component dialog.
	 * 
	 * @return list of footerSubNavList.
	 */
	public List<FooterSubNavigation> getFooterSubNavList() {
		return footerSubNavList;
	}
	
	/**
	 * @return the subNavId
	 */
	public String getSubNavId() {
		return subNavId;
	}
	
}
